import { Equipment, EQUIPMENT_TYPES } from './Equipment';

describe('Equipment', () => {
    let user = null;
    let object = null;
    beforeEach(()=>{
        user = { apply: jest.fn() };
        object = { apply: jest.fn() };
    })
    
    test('testing item health effect', () => {
        const effects = [
            { health: { modifier: -1, range: '1:3' } },
            { self: true, health: { modifier: 1, range: '1:3' } },
        ];

        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { chance: 100 });
        const result = lifeDrainingSword.use(user, object);

        expect(result).toBeTruthy();
        expect(object.apply.mock.calls.length).toBe(1);
        expect(object.apply.mock.calls[0][0].health).toBeLessThan(0);
        expect(user.apply.mock.calls.length).toBe(1)
        expect(user.apply.mock.calls[0][0].health).toBeGreaterThan(0)
    });

    test('testing item health effect with no range', () => {
        const effects = [
            { health: { modifier: -1, range: '1' } },
            { self: true, health: { modifier: 1, range: '1' } },
        ];

        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { chance: 100 });
        const result = lifeDrainingSword.use(user, object);

        expect(result).toBeTruthy();
        expect(object.apply.mock.calls.length).toBe(1);
        expect(object.apply.mock.calls[0][0].health).toBe(-1);
        expect(user.apply.mock.calls.length).toBe(1)
        expect(user.apply.mock.calls[0][0].health).toBe(1);
    });

});