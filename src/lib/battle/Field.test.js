import { Field, defaultConfig } from './Field';

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
            expect(field.areTilesAdjacent({ i: 0, j: 0 }, { i: 0, j: 1 })).toBe(true);
        });
    });
});