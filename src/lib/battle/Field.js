import get from 'lodash.get';
import { range } from 'lib';

const tileGenerator = (customTile, defaultTile) => {
    return {
        ...defaultTile,
        ...customTile
    };
};

export const defaultConfig = {
    size: {
        i: 4,
        j: 4
    },
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
        for (const i in range(0, this.size.i)) {
            this.tiles[i] = [];
            for (const j in range(0, this.size.j)) {
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

    tilesDistance({ i: pi, j: pj }, { i: p1i, j: p1j }) {
        return Math.max(
            Math.abs(pi - p1i),
            Math.abs(pj - p1j)
        );
    }

    getTilesAtRange({ i, j }, { maxD = 1, d = null } = {}) {
        let min = Math.max(0, i - maxD);
        let max = Math.min(this.size.i, i + maxD);
        const is = [];
        for (let idx = min; idx <= max; idx++) {
            is.push(idx);
        }

        min = Math.max(0, j - maxD);
        max = Math.min(this.size.j, j + maxD);
        const js = [];
        for (let idx = min; idx <= max; idx++) {
            js.push(idx);
        }

        const tiles = {};

        for (const index in is) {
            const currentI = is[index];
            tiles[currentI] = {};
            for (const jIndex in js) {
                const currentJ = js[jIndex];
                if (!(currentI === i && currentJ === j)) {
                    tiles[currentI][currentJ] = true;
                }
            }
        }

        return tiles;

    }
}