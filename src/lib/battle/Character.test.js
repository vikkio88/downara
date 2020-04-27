import { Character, FACING } from './Character';

describe('Character', () => {
    const id = 'someId';
    const stats = {};
    const inventory = {};
    const position = { i: 0, j: 0 };
    const facing = FACING.RIGHT;


    describe('positioning and movements', () => {
        test('setting initial position and faced direction', () => {
            const initialPosition = { i: 1, j: 1 };
            const character = new Character(id, stats, inventory, initialPosition, FACING.UP);

            expect(character.getPosition()).toBe(initialPosition);
            expect(character.getFacing()).toBe(FACING.UP);
        });

        test('facing direction change with valid input', () => {
            const character = new Character(id, stats, inventory, position, facing);

            character.setFacing(FACING.DOWN);
            expect(character.getFacing()).toBe(FACING.DOWN);
        });

        test('facing direction change with invalid input', () => {
            const character = new Character(id, stats, inventory, position, FACING.LEFT);

            character.setFacing('fabrizio');
            expect(character.getFacing()).toBe(FACING.LEFT);
        });
    });

    describe('stats and effects', () => {
        test('stats override', () => {
            const character = new Character('someDude');
            const character1 = new Character(id, { hp: 10 });
            expect(character.getHealthPoints()).toBe(100);
            expect(character1.getHealthPoints()).toBe(10);
        });

        test('applying health effect', () => {
            const character = new Character(id);
            expect(character.getHealthPoints()).toBe(100);
            const effect = { health: -10 };
            character.apply(effect);
            expect(character.getHealthPoints()).toBe(90);

            character.apply({ health: 10 });
            expect(character.getHealthPoints()).toBe(100);
        });

        test('applying endurance effect', () => {
            const character = new Character(id);
            expect(character.getEndurance()).toBe(100);
            const effect = { endurance: -10 };
            character.apply(effect);
            expect(character.getEndurance()).toBe(90);

            character.apply({ endurance: 10 });
            expect(character.getEndurance()).toBe(100);
        });

        test('if endurance is finished pay with hp', () => {
            const character = new Character(id, { endurance: 10 });
            const effect = { endurance: -10 };

            expect(character.getHealthPoints()).toBe(100);
            expect(character.getEndurance()).toBe(10);
            character.apply(effect);
            expect(character.getEndurance()).toBe(0);
            expect(character.getHealthPoints()).toBe(100);
            character.apply(effect);
            expect(character.getEndurance()).toBe(0);
            expect(character.getHealthPoints()).toBe(90);
        });

        test('if endurance is not enough pay the rest with hp', () => {
            const character = new Character(id, { endurance: 20 });
            const effect = { endurance: -40 };

            expect(character.getHealthPoints()).toBe(100);
            expect(character.getEndurance()).toBe(20);
            character.apply(effect);
            expect(character.getEndurance()).toBe(0);
            expect(character.getHealthPoints()).toBe(80);
        });
    });

});