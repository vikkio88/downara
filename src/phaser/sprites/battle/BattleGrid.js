import { extractFromCoordinates, randomizer, eventBridge } from 'lib';
import { ACTIONS } from "lib/battle/Battle";
import Tile from './BattleTile';
import Actor from './Actor';
import SPRITES from 'downara/sprites';
import { OBJECT_CONFIG } from '../mapping';

const animationFinishedLabel = index => `turn_${index}_finished`;

const ACTION_ANIMATIONS = {
    [ACTIONS.MOVE]: (grid, target, result, index) => {
        const move = ACTIONS.MOVE;
        if (!result) return ACTION_ANIMATIONS.failedWiggle(grid, target, result, index, move);
        const { i, j } = result.position || target.getPosition();
        const tile = grid.getTile({ i, j });
        const { x, y } = tile.getCenter();
        const config = {
            targets: target,
            x, y,
            duration: 1000,
            ease: 'circular.easeInOut',
            loop: false,
            onComplete: () => grid.scene.events.emit(animationFinishedLabel(index))
        };
        return () => {
            target.reportResult(move, Boolean(result));
            grid.scene.tweens.add(config);
        };
    },
    [ACTIONS.ATTACK]: (grid, target, result, index, movePayload) => {
        const { position } = movePayload;
        const move = ACTIONS.ATTACK;
        if (!result) return ACTION_ANIMATIONS.failedTile(grid, target, { position }, index, ACTIONS.ATTACK);
        const tile = grid.getTile(position);
        const callback = () => {
            grid.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    grid.scene.events.emit(animationFinishedLabel(index));
                    tile.resetIndicator();
                },
                loop: false,
            });
        };
        return () => {
            target.reportResult(move, Boolean(result));
            tile.showAttackSuccess(result, callback);
        };
    },
    [ACTIONS.PARRY]: (grid, target, result, index) => {
        // parry can fail if player died
        const callback = () => grid.scene.events.emit(animationFinishedLabel(index));
        if (!result) return () => callback();
        return () => {
            target.reportResult(ACTIONS.PARRY, Boolean(result));
            target.showParry(callback);
        };
    },
    [ACTIONS.USE_ITEM]: () => {

    },
    failedWiggle: (grid, target, result, index, move) => {
        const x = randomizer.bool() ? 1 : -1 * randomizer.int(30, 50);
        const y = randomizer.bool() ? 1 : -1 * randomizer.int(30, 50);
        const to = randomizer.bool() ? 1 : -1 * randomizer.int(20, 180);
        return () => {
            target.reportResult(move);
            grid.scene.tweens.add({
                targets: target,
                x: target.x - x,
                y: target.y + y,
                angle: { from: 0, to },
                duration: 1000,
                ease: 'sine.out',
                loop: false,
                yoyo: true,
                onComplete: () => grid.scene.events.emit(animationFinishedLabel(index))
            });
        };
    },
    failedTile: (grid, target, result, index, move) => {
        const { i, j } = result.position;
        const tile = grid.getTile({ i, j });
        const callback = () => {
            grid.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    grid.scene.events.emit(animationFinishedLabel(index));
                    tile.resetIndicator();
                },
                loop: false,
            });
        };
        return () => {
            target.reportResult(move);
            tile.showFailedMove(callback);
        };
    }
};
export default class {
    constructor(
        scene,
        {
            map = {},
            actors = [],
        } = {},
        config = {}
    ) {
        const { rows = 9, columns = 13, tileSize = 100,
            tileMargin = 1, marginI = 0, marginJ = 0
        } = config;
        this.scene = scene;

        this.map = map;
        this.actors = actors;

        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.tileMargin = tileMargin;
        this.marginI = marginI;
        this.marginJ = marginJ;
        this.tiles = new Map();
        this.highlightedTiles = [];
        this.staticAssets = [];
        this.actorsMap = new Map();

        this.actionables = [];
    }

    create() {
        for (let i = 0; i < this.rows; i++) {
            const row = new Map();
            for (let j = 0; j < this.columns; j++) {
                const {
                    t: terrain, o: object, ov: variant, b: blocked
                } = extractFromCoordinates({ i, j }, this.map, {});
                const tile = new Tile(
                    this.scene,
                    this.tileSize,
                    { i, j },
                    {
                        x: this.marginJ + (this.tileMargin * (j + 1)) + (j * this.tileSize),
                        y: this.marginI + (this.tileMargin * (i + 1)) + (i * this.tileSize)
                    },
                    terrain,
                    Boolean(blocked)
                );
                this.addObject(object, tile.getCenter(), variant);
                row.set(j, tile);
            }
            this.tiles.set(i, row);
        }

        for (const actor of this.actors) {
            this.addActor(actor);
        }
    }

    highlight(tiles = []) {
        for (const tile of tiles) {
            const { i, j } = tile;
            this.tiles.get(i).get(j).setActionable(() => this.resetHighlighted());
        }

        this.disableActionables();

        this.highlightedTiles = tiles;
    }

    resetHighlighted() {
        for (const tile of this.highlightedTiles) {
            const { i, j } = tile;
            this.tiles.get(i).get(j).reset();
        }

        this.enableActionables();
        this.highlightedTiles = [];
    }

    addActor(config) {
        const { id, type, i, j, character } = config;
        const tile = this.tiles.get(i).get(j);
        const { x, y } = tile.getCenter();
        const actor = new Actor(this.scene, this, character, type, x, y);
        this.actorsMap.set(id, actor);
        if (!character.ai) this.player = actor;
    }

    addObject(name, { x, y }, variant = 0) {
        if (!Object.values(SPRITES.NAMES).includes(name)) {
            return;
        }

        const defaultConfig = OBJECT_CONFIG.default;
        const config = {
            ...defaultConfig,
            ...(OBJECT_CONFIG[name] || {})
        };
        const { offset, scale, flipX } = config;

        const frame = SPRITES.FRAMES[name][variant] || SPRITES.FRAMES[name][0];

        const object = this.scene.add.sprite(
            x + offset.x,
            y + offset.y,
            'mapTiles',
            frame
        ).setScale(scale);

        if (flipX) object.flipX = true;
        this.staticAssets.push(object);
    }

    getTile({ i, j }) {
        const row = this.tiles.get(i) || null;
        if (!row) return null;

        return row.get(j) || null;
    }

    destroyByKey(map, key) {
        const toDestroy = map.get(key);
        if (toDestroy) toDestroy.destroy();
    }

    destroy() {
        for (const [i, row] of this.tiles) {
            for (const [j, tile] of row) {
                tile.destroy();
            }
        }

        for (const [_, object] of this.actorsMap) {
            object.destroy();
        }

        for (const object of this.staticAssets) {
            object.destroy();
        }
    }

    registerActionable(object) {
        this.actionables.push(object);
    }

    disableActionables() {
        for (const actionable of this.actionables) {
            actionable.disableClick();
        }
    }

    enableActionables() {
        for (const actionable of this.actionables) {
            actionable.enableClick();
        }
    }

    playTurnActions(actions) {
        let firstTurn = null;
        for (const index in actions) {
            const { id, move, result } = actions[index];
            const { type, payload } = move; // for some reason payload has payload
            if (parseInt(index) === 0) {
                firstTurn = this.getAnimation(id, { type, payload, result }, index);
                continue;
            }

            this.scene.events.once(
                animationFinishedLabel(index - 1),
                this.getAnimation(id, { type, payload, result }, index)
            );
        }

        this.scene.events.once(
            animationFinishedLabel(actions.length - 1),
            () => eventBridge.emitFromPhaser('battle:unlock')
        );

        firstTurn && firstTurn();
    }

    getAnimation(id, action, index) {
        const actor = this.actorsMap.get(id);
        const { type, payload, result } = action;

        const actionAnimationGenerator = ACTION_ANIMATIONS[type];
        if (!actionAnimationGenerator) return;

        return actionAnimationGenerator(this, actor, result, index, payload);
    }
}