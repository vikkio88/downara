import { Equipment, EQUIPMENT_TYPES } from './Equipment';

describe('Equipment', () => {
    test('testing item effect', () => {
        const user = { apply: jest.fn() };
        const object = { apply: jest.fn() };
        const effects = [
            { health: -1, description: '-1 HP' },
            { self: true, health: 1, description: '+1 HP' },
        ];
        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { chance: 100 });
        const result = lifeDrainingSword.use(user, object);
        expect(result).toBeTruthy();
        expect(user.apply.mock.calls.length).toBe(1);

    });
});