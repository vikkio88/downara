import get from 'lodash.get';
import { range } from 'lib';

const tileGenerator = (customTile, defaultTile) => {
    return {
        ...defaultTile,
        ...customTile
    };
};

export const defaultConfig = {
    size: 4,
    defaultTile: {
        terrain: 'd',
        blocked: false,
    }
};

export class Field {
    constructor(config = {}, tiles = {}) {
        config = {
            ...defaultConfig,
            ...config,
        };
        this.defaultTile = config.defaultTile;
        this.size = config.size;
        this.tiles = [];
        for (const i in range(0, this.size)) {
            this.tiles[i] = [];
            for (const j in range(0, this.size)) {
                const customTile = get(tiles, `${i}.${j}`, null);
                this.tiles[i][j] = customTile ?
                    tileGenerator(customTile, this.defaultTile)
                    : this.defaultTile;
            }
        }
    }

    getTile(i, j) {
        return get(this.tiles, `${i}.${j}`, null);
    }

    areTilesAdjacent({ i: pi, j: pj }, { i: p1i, j: p1j }, maxD = 1) {
        return Math.abs(pi - p1i) <= maxD && Math.abs(pj - p1j) <= maxD;
    }
}