import { Battle } from './Battle';


describe('Battle test (battletesting battle test)', () => {
    describe('initialization', () => {
        it('initializes correctly the battle', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 1 },
                { id: 'test2', getSpeed: () => 4 },
            ];

            const battle = new Battle(null, characters);
            expect(battle.characters).toEqual(characters);
            expect(battle.turns).toEqual({
                count: 0,
                order: ['test2', 'test1'],
                next: 'test2',
                last: null
            });

            expect(battle.moves).toEqual({});
            expect(battle.log).toEqual({});
        });
    });
})