import get from 'lodash.get';
import { range, pg } from 'lib';

export const OBJECTS = {
    CHARACTER: 'character',
    // maybe to spawn random heal items?
    COLLECTABLE: 'collectable',
};

export const TERRAINS = {
    DIRT: 'dirt',
    GRASS: 'grass',
    STONE: 'stone',
    WATER: 'water',
};

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
        terrain: TERRAINS.GRASS,
        blocked: false,
        object: null
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

    placeObject({ type = null, id = null } = {}, { i, j }) {
        if (type === null || id === null) {
            console.error(`trying to add null object to tile {${i}, ${j}}`);
            this.tiles[i][j].object = null;
            return;
        }
        this.tiles[i][j] = {
            ...this.tiles[i][j],
            object: { type, id }
        };
    }

    getObject({ i, j }) {
        const tile = this.getTile(i, j);
        return tile.object || null;
    }

    moveObjectIfFree({ i, j }, { i: fi, j: fj }) {
        const occupied = this.getObject(pg(fi, fj)) !== null;

        if (occupied) return false;

        this.moveObject(pg(i, j), pg(fi, fj));
        return true;
    }

    moveObject({ i, j }, { i: fi, j: fj }) {
        const object = this.getObject({ i, j });
        this.removeObject({ i, j });
        this.placeObject(object, { i: fi, j: fj });
    }

    removeObject({ i, j }) {
        this.tiles[i][j] = {
            ...this.tiles[i][j],
            object: null
        };
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

    nextStepToTile({ i: pi, j: pj }, { i: p1i, j: p1j }, step = 1) {
        if (this.tilesDistance({ i: pi, j: pj }, { i: p1i, j: p1j }) <= step) {
            return {
                i: pi,
                j: pj
            };
        }

        const i = pi > p1i ? pi - step : (pi < p1i) ? pi + step : pi;
        const j = pj > p1j ? pj - step : (pj < p1j) ? pj + step : pj;
        return { i, j };
    }

    // d is there in order to maybe get only tiles to a particular
    // fixed distance instead of a range
    getTilesAtRange({ i, j }, { maxD = 1, d = null } = {}) {
        let min = Math.max(0, i - maxD);
        let max = Math.min(this.size.i - 1, i + maxD);
        const is = [];
        for (let idx = min; idx <= max; idx++) {
            is.push(idx);
        }

        min = Math.max(0, j - maxD);
        max = Math.min(this.size.j - 1, j + maxD);
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

    getFlatTilesAtRange({ i, j }, { maxD = 1, d = null } = {}) {
        const adj = this.getTilesAtRange({ i, j }, { maxD, d: d });
        const result = [];
        const rows = Object.keys(adj);
        for (let rowIndex in rows) {
            const row = rows[rowIndex];
            const rowValue = parseInt(row);
            const columns = Object.keys(adj[row]);
            for (let columnIndex in columns) {
                const column = parseInt(columns[columnIndex]);
                result.push(
                    { i: rowValue, j: column }
                );
            }
        }

        return result;
    }
}