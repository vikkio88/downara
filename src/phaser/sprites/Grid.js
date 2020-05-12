import Tile from './Tile';

export default class {
    constructor(scene, { rows = 9, columns = 13, tileSize = 100, tileMargin = 1, marginI = 0, marginJ = 0 } = {}) {
        this.scene = scene;
        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.tileMargin = tileMargin;
        this.marginI = marginI;
        this.marginJ = marginJ;
        this.tiles = new Map;
    }

    create() {
        for (let i = 0; i < this.rows; i++) {
            const row = new Map;
            for (let j = 0; j < this.columns; j++) {
                const tile = new Tile(
                    this.scene,
                    this.tileSize,
                    { i, j },
                    {
                        x: this.marginJ + (this.tileMargin * (j + 1)) + (j * this.tileSize),
                        y: this.marginI + (this.tileMargin * (i + 1)) + (i * this.tileSize)
                    }
                );
                row.set(j, tile);
            }
            this.tiles.set(i, row);
        }
    }
}