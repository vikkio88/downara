import { Field } from './Field';

describe('Field', () => {
    test('test get', () => {
        const field = new Field;
        const tile = field.getTile(0, 0);
        console.log(tile);
        expect(1).toBe(1);
    });
});