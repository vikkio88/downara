import { Field, defaultConfig } from './Field';

//position generator helper
const pg = (i = 0, j = 0) => ({ i, j });

describe('Field', () => {
    describe('init functions', () => {
        test('get single Tile', () => {
            const field = new Field;
            const tile = field.getTile(0, 0);
            expect(tile).toEqual(defaultConfig.defaultTile);
        });

        test('set custom tile', () => {
            const customTile = { terrain: 'f', blocked: false };
            const field = new Field({}, { 0: { 0: customTile, 1: { character: 'stuff' } } });
            expect(field.getTile(0, 0)).toEqual(customTile);
            expect(field.getTile(0, 1)).toEqual({ ...defaultConfig.defaultTile, character: 'stuff' });
        });
    });

    describe('positioning', () => {
        it('correctly reports if tiles are adjacent', () => {
            const field = new Field();
            expect(field.areTilesAdjacent(pg(), { i: 0, j: 1 })).toBe(true);
        });

        it('calculates distances correctly in a 2x2', () => {
            const size = { i: 2, j: 2 };
            const field = new Field({ size });

            expect(field.tiles.length).toBe(size.i);
            expect(field.tiles[0].length).toBe(size.j);

            expect(field.tilesDistance(pg(), pg())).toBe(0);
            expect(field.tilesDistance(pg(), pg(0, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 0))).toBe(1);
        });

        it('calculates distances correctly in a 4x4', () => {
            const size = { i: 4, j: 4 };
            const field = new Field({ size });

            expect(field.tiles.length).toBe(size.i);
            expect(field.tiles[0].length).toBe(size.j);

            expect(field.tilesDistance(pg(), pg())).toBe(0);
            // distance 1
            expect(field.tilesDistance(pg(), pg(0, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 0))).toBe(1);

            // distance 2
            expect(field.tilesDistance(pg(), pg(2, 0))).toBe(2);
            expect(field.tilesDistance(pg(), pg(2, 1))).toBe(2);
            expect(field.tilesDistance(pg(), pg(2, 2))).toBe(2);
            expect(field.tilesDistance(pg(), pg(1, 2))).toBe(2);
            expect(field.tilesDistance(pg(), pg(0, 2))).toBe(2);

            // distance 3
            expect(field.tilesDistance(pg(), pg(3, 0))).toBe(3);
            expect(field.tilesDistance(pg(), pg(3, 1))).toBe(3);
            expect(field.tilesDistance(pg(), pg(3, 2))).toBe(3);
            expect(field.tilesDistance(pg(), pg(3, 3))).toBe(3);
            expect(field.tilesDistance(pg(), pg(2, 3))).toBe(3);
            expect(field.tilesDistance(pg(), pg(1, 3))).toBe(3);
            expect(field.tilesDistance(pg(), pg(0, 3))).toBe(3);

            // spot check
            expect(field.tilesDistance(pg(3, 3), pg(2, 3))).toBe(1);
            expect(field.tilesDistance(pg(2, 2), pg(0, 2))).toBe(2);
            expect(field.tilesDistance(pg(3, 2), pg(1, 1))).toBe(2);
            expect(field.tilesDistance(pg(3, 3), pg(0, 1))).toBe(3);
        });
    });
});