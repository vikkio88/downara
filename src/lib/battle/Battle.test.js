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
            expect(battle.finished).toBe(false);
            expect(battle.needsResolving).toBe(false);
            expect(battle.turns).toEqual({
                turn: 0,
                index: 0,
                count: 0,
                order: ['test2', 'test1'],
                next: 'test2',
                last: null
            });

            expect(battle.moves).toEqual({});
            expect(battle.log).toEqual({});
        });
    });
    describe('turns', () => {
        it('registering actions', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 1 },
                { id: 'test2', getSpeed: () => 4 },
            ];

            const battle = new Battle(null, characters);
            const fakeAction = { type: 'a', payload: { some: 'thing' } };
            let charId = battle.getCurrentTurn();

            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(1);
            expect(battle.turns.next).toBe('test1');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(1);
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][0]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCurrentTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(0);
            expect(battle.turns.next).toBe('test2');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(2);
            expect(battle.turns.turn).toBe(1);
            expect(battle.moves[0][1]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(true);
        });

        it('registering actions with 3 characters', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 1 },
                { id: 'test2', getSpeed: () => 4 },
                { id: 'test3', getSpeed: () => 5 },
            ];

            const battle = new Battle(null, characters);
            const fakeAction = { type: 'a', payload: { some: 'thing' } };
            
            let charId = battle.getCurrentTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(1);
            expect(battle.turns.next).toBe('test2');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(1);
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][0]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCurrentTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(2);
            expect(battle.turns.next).toBe('test1');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(2);
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][1]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCurrentTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(0);
            expect(battle.turns.next).toBe('test3');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(3);
            expect(battle.turns.turn).toBe(1);
            expect(battle.moves[0][2]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(true);
        });

        it.skip('test', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 1 },
                { id: 'test2', getSpeed: () => 4 },
                { id: 'test3', getSpeed: () => 2 },
            ];

            const battle = new Battle(null, characters);
            const fakeAction = { type: 'a', payload: { some: 'thing' } };
            for (let i = 0; i <= 30; i++) {
                let charId = battle.getCurrentTurn();
                battle.registerAction(charId, fakeAction.type, fakeAction.payload);
                console.log({
                    iteration: i,
                    index: battle.turns.index,
                    next: battle.turns.next,
                    last: battle.turns.last,
                    count: battle.turns.count,
                    turn: battle.turns.turn
                });
            }

            console.log(JSON.stringify(battle.moves));

        });
    });

});