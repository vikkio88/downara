import { extractFromCoordinates } from 'lib';
import Tile from './Tile';
import { FRAMES, NAMES, OBJECT_CONFIG } from './mapping';

export default class {
    constructor(
        scene,
        map = {},
        objects = {},
        config = {}
    ) {
        const { rows = 9, columns = 13, tileSize = 100,
            tileMargin = 1, marginI = 0, marginJ = 0
        } = config;
        this.scene = scene;

        this.map = map;
        this.objects = objects;

        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.tileMargin = tileMargin;
        this.marginI = marginI;
        this.marginJ = marginJ;
        this.tiles = new Map();

        this.objectsMap = new Map();
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

                const { object: overrideObject } = extractFromCoordinates({ i, j }, this.objects, {});
                this.addObject(overrideObject || object, tile.getCenter(), variant, overrideObject ? `${i}_${j}` : false);
                row.set(j, tile);
            }
            this.tiles.set(i, row);
        }

        console.log(this.objectsMap);
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
        const { offset, scale } = config;
        
        const frame = FRAMES[name][variant] || FRAMES[name][0];

        const object = this.scene.add.sprite(
            x + offset.x,
            y + offset.y,
            'mapTiles',
            frame
        ).setScale(scale);

        if (key) this.objectsMap.set(key, object);
    }
}