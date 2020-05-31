import { extractFromCoordinates } from 'lib';
import Tile from './Tile';
import SPRITES from 'downara/sprites';
import { OBJECT_CONFIG } from './mapping';

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

        this.staticAssets = [];
        this.actorsMap = new Map();
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

    addActor({ id, type, i, j }) {
        const tile = this.tiles.get(i).get(j);
        const { x, y } = tile.getCenter();
        const actor = this.scene.add.sprite(
            x,
            y,
            type
        );

        this.actorsMap.set(id, actor);

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
}