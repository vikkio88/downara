import get from 'lodash.get';
import { range } from 'lib';
const tileGenerator = ({ terrain, blocked = false }) => {
    return { terrain, blocked };
};
const defaultConfig = {
    tile: {
        terrain: 'd',
        blocked: false,
    }
};

export class Field {
    constructor(size = 4, config = defaultConfig, tiles = {}) {
        this.size = size;
        this.tiles = [];
        for (const i in range(0, size)) {
            this.tiles[i] = [];
            for (const j in range(0, size)) {
                const customTile = get(tiles, `${i}.${j}`, null);
                this.tiles[i][j] = customTile ? tileGenerator(customTile) : defaultConfig;
            }
        }
    }

    getTile(i, j) {
        return get(this.tiles, `${i}.${j}`, null);
    }
}