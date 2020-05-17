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
    }

    addObject(name, { x, y }, variant = 0) {
        if (!Object.values(NAMES).includes(name)) {
            return;
        }

        const { offset, scale } = OBJECT_CONFIG[name] || OBJECT_CONFIG.default;
        const frame = FRAMES[name][variant] || FRAMES[name][0];

        this.scene.add.sprite(
            x + offset.x,
            y + offset.y,
            'mapTiles',
            frame
        ).setScale(scale);
    }
}