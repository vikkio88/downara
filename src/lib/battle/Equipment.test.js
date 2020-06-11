import { Equipment, EQUIPMENT_TYPES } from './Equipment';

describe('Equipment', () => {
    let user = null;
    let object = null;
    beforeEach(() => {
        user = { apply: jest.fn(), getStats: jest.fn() };
        object = { apply: jest.fn(), getStats: jest.fn() };
    });

    test('testing item health effect', () => {
        const effects = [
            { health: { modifier: -1, range: '1:3' } },
            { self: true, health: { modifier: 1, range: '1:3' } },
        ];

        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { hitDie: 1 });
        const result = lifeDrainingSword.use(user, object);

        expect(result).toBeTruthy();
        expect(object.apply.mock.calls.length).toBe(1);
        expect(object.apply.mock.calls[0][0].health).toBeLessThan(0);
        expect(user.apply.mock.calls.length).toBe(1);
        expect(user.apply.mock.calls[0][0].health).toBeGreaterThan(0);

        expect(result).toEqual(expect.objectContaining({
            die: expect.any(Number),
            results: {
                self: expect.arrayContaining([{ health: expect.any(Number) }]),
                enemy: expect.arrayContaining([{ health: expect.any(Number) }])
            }
        }));

        expect(result.results.self[0].health).toBeGreaterThanOrEqual(1);
        expect(result.results.enemy[0].health).toBeLessThanOrEqual(-1);
    });

    test('testing item health effect with no range', () => {
        const effects = [
            { health: { modifier: -1, range: '1' } },
            { self: true, health: { modifier: 1, range: '1' } },
        ];

        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { hitDie: 1 });
        const result = lifeDrainingSword.use(user, object);

        expect(result).toBeTruthy();
        expect(object.apply.mock.calls.length).toBe(1);
        expect(object.apply.mock.calls[0][0].health).toBe(-1);
        expect(user.apply.mock.calls.length).toBe(1);
        expect(user.apply.mock.calls[0][0].health).toBe(1);

        expect(result).toEqual(expect.objectContaining({
            die: expect.any(Number),
            results: {
                self: expect.arrayContaining([{ health: expect.any(Number) }]),
                enemy: expect.arrayContaining([{ health: expect.any(Number) }])
            }
        }));

        expect(result.results.self[0].health).toBe(1);
        expect(result.results.enemy[0].health).toBe(-1);
    });

    test('checking how it fails there was no target', () => {
        const effects = [
            { health: { modifier: -1, range: '1' } },
            { self: true, health: { modifier: 1, range: '1' } },
        ];

        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { hitDie: 1 });
        const result = lifeDrainingSword.use(user, null);

        expect(result).toBe(false);
    });

    test('using a weapon will drain also endurance for the user', () => {
        const effects = [
            { health: { modifier: -1, range: '1' } },
            { self: true, health: { modifier: 1, range: '1' } },
        ];

        const lifeDrainingSword = new Equipment('Spada Suca-Vita', EQUIPMENT_TYPES.MELEE, effects, { hitDie: 1, endurance: -1 });
        const result = lifeDrainingSword.use(user, object);

        expect(result).toBeTruthy();
        expect(object.apply.mock.calls.length).toBe(1);
        expect(object.apply.mock.calls[0][0].health).toBe(-1);
        expect(user.apply.mock.calls.length).toBe(2);
        expect(user.apply.mock.calls[0][0].endurance).toBe(-1);
        expect(user.apply.mock.calls[1][0].health).toBe(1);
    });

});