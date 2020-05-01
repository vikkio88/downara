import { Battle } from './Battle';


describe('Battle test (battletesting battle test)', () => {

    describe('initialization', () => {
        it('initializes correctly the battle', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 1, isAi: () => true },
                { id: 'test2', getSpeed: () => 4, isAi: () => true },
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
                { id: 'test1', getSpeed: () => 1, isAi: () => true },
                { id: 'test2', getSpeed: () => 4, isAi: () => true },
            ];

            const battle = new Battle(null, characters);
            const fakeAction = { type: 'a', payload: { some: 'thing' } };
            let charId = battle.getCharacterIdTurn();

            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(1);
            expect(battle.turns.next).toBe('test1');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(1);
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][0]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
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
                { id: 'test1', getSpeed: () => 1, isAi: () => true },
                { id: 'test2', getSpeed: () => 4, isAi: () => true },
                { id: 'test3', getSpeed: () => 5, isAi: () => true },
            ];

            const battle = new Battle(null, characters);
            expect(battle.humanId).toBe(null);
            expect(battle.getHumanPosition()).toBe(null);
            const fakeAction = { type: 'a', payload: { some: 'thing' } };

            let charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(1);
            expect(battle.turns.next).toBe('test2');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(1);
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][0]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(2);
            expect(battle.turns.next).toBe('test1');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(2);
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][1]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.index).toBe(0);
            expect(battle.turns.next).toBe('test3');
            expect(battle.turns.last).toBe(charId);
            expect(battle.turns.count).toBe(3);
            expect(battle.turns.turn).toBe(1);
            expect(battle.moves[0][2]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(true);
        });

        it('putting human first on turns, recording right order to resolve', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 4, isAi: () => true },
                { id: 'test2', getSpeed: () => 11, isAi: () => true },
                { id: 'test3', getSpeed: () => 2, isAi: () => true },
                { id: 'test5', getSpeed: () => 10, isAi: () => true },
                { id: 'human', getSpeed: () => 1, isAi: () => false },
                { id: 'test4', getSpeed: () => 3, isAi: () => true },
            ];

            const battle = new Battle(null, characters);
            expect(battle.humanId).toBe('human');
            const fakeAction = { type: 'a', payload: { some: 'thing' } };

            expect(battle.turns.next).toBe('human');
            let charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.next).toBe('test2');
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.next).toBe('test5');
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.next).toBe('test1');
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.next).toBe('test4');
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.turns.next).toBe('test3');
            expect(battle.needsResolving).toBe(false);

            charId = battle.getCharacterIdTurn();
            battle.registerAction(charId, fakeAction.type, fakeAction.payload);
            expect(battle.needsResolving).toBe(true);
            expect(battle.resolveOrder).toEqual([
                'test2', 'test5', 'test1', 'test4', 'test3', 'human'
            ]);
        });

        it.skip('test', () => {
            const characters = [
                { id: 'test1', getSpeed: () => 1, isAi: () => true },
                { id: 'test2', getSpeed: () => 4, isAi: () => true },
                { id: 'test3', getSpeed: () => 2, isAi: () => true },
            ];

            const battle = new Battle(null, characters);
            const fakeAction = { type: 'a', payload: { some: 'thing' } };
            for (let i = 0; i <= 30; i++) {
                let charId = battle.getCharacterIdTurn();
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

    describe('flow', () => {
        it('will execute the correct flow with 2 players', () => {
            const fakeAction = { type: 'a', payload: { some: 'thing' } };
            const humanDecider = jest.fn();
            const characters = [
                { id: 'test1', getSpeed: () => 1, isAi: () => true, decideMove: () => fakeAction },
                { id: 'test2', getSpeed: () => 4, isAi: () => true, decideMove: () => fakeAction },
                { id: 'human', getSpeed: () => 2, isAi: () => false, decideMove: humanDecider },
            ];

            const battle = new Battle(null, characters);
            expect(battle.getCurrentTurn()).toBe(0);
            const human = battle.getCharacterIdTurn();
            expect(human).toBe('human');
            battle.registerAction(human, fakeAction.type, fakeAction.payload);

            while (!battle.needsResolving) {
                const result = battle.getNextAction();
                expect(result).toBe(true);
            }

            expect(battle.needsResolving).toBe(true);
            expect(battle.getCurrentTurn()).toBe(1);

            expect(humanDecider).not.toBeCalled();
        });
    });

});