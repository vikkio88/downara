import { extractFromCoordinates } from 'lib';
import Tile from './Tile';
import { FRAMES, NAMES, OBJECT_CONFIG, FLAGS } from './mapping';

export default class {
    constructor(
        scene,
        map = {},
        objects = {},
        flags = {},
        config = {}
    ) {
        const { rows = 9, columns = 13, tileSize = 100,
            tileMargin = 1, marginI = 0, marginJ = 0
        } = config;
        this.scene = scene;

        this.map = map;
        this.objects = objects;
        this.flags = flags;

        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.tileMargin = tileMargin;
        this.marginI = marginI;
        this.marginJ = marginJ;
        this.tiles = new Map();

        this.objectsMap = new Map();
        this.flagsMap = new Map();
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

                const tileKey = `${i}_${j}`;
                const { sprite: overrideObject } = extractFromCoordinates({ i, j }, this.objects, {});
                this.addObject(overrideObject || object, tile.getCenter(), variant, overrideObject ? tileKey : false);
                const { type } = extractFromCoordinates({ i, j }, this.flags, {});
                if (type) this.addFlag(type, tile.getTopRight(), tileKey);
                row.set(j, tile);
            }
            this.tiles.set(i, row);
        }
    }

    addObject(name, { x, y }, variant = 0, key = false) {
        if (!Object.values(NAMES).includes(name)) {
            return;
        }

        const defaultConfig = OBJECT_CONFIG.default;
        const config = {
            ...defaultConfig,
            ...(OBJECT_CONFIG[name] || {})
        };
        const { offset, scale, flipX } = config;

        const frame = FRAMES[name][variant] || FRAMES[name][0];

        const object = this.scene.add.sprite(
            x + offset.x,
            y + offset.y,
            'mapTiles',
            frame
        ).setScale(scale);

        if (flipX) object.flipX = true;

        if (key) this.objectsMap.set(key, object);
    }

    addFlag(type, { x, y }, key) {
        const flag = this.scene.add.sprite(
            x - 10,
            y + 10,
            'mapTiles',
            FLAGS[type] || FLAGS.red
        ).setScale(1.5);

        this.flagsMap.set(key, flag);
    }

    updateGrid(objects, flags) {
        // flags
        let { remove = [], add = [] } = flags;
        for (let flag of remove) {
            const key = `${flag.i}_${flag.j}`;
            const toDestroy = this.flagsMap.get(key);
            if (toDestroy) toDestroy.destroy();
        }

        for (let flag of add) {
            const { i, j, type } = flag;
            const { x, y } = this.getTile(flag).getTopRight();
            this.addFlag(type, { x, y }, `${i}_${j}`);
        }


        // thinking of doing something like
        // { add , remove }
        // remove forEach 
        // add forEach getTile i,j -> addObject object, tileXY
    }


    getTile({ i, j }) {
        const row = this.tiles.get(i) || null;
        if (!row) return null;

        return row.get(j) || null;
    }
}