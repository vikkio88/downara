import { Field, defaultConfig } from './Field';

describe('Field', () => {
    test('test get', () => {
        const field = new Field;
        const tile = field.getTile(0, 0);
        expect(tile).toEqual(defaultConfig.defaultTile);
    });

    test('set', () => {
        const customTile = { terrain: 'f', blocked: false };
        const field = new Field({}, { 0: { 0: customTile, 1: { character: 'stuff' } } });
        expect(field.getTile(0, 0)).toEqual(customTile)
        expect(field.getTile(0, 1)).toEqual({ ...defaultConfig.defaultTile, character: 'stuff' })
    });
});