import { Battle } from './Battle';

const charGen = ({ id = 'test1', getSpeed = () => 1, isAi = () => true, getHealthPoints = () => 1, ...others } = {}) => {
    return { id, getSpeed, isAi, getHealthPoints, ...others };
};


describe('Battle test (battletesting battle test)', () => {

    describe('initialization', () => {
        it('initializes correctly the battle', () => {
            const characters = [
                charGen(),
                charGen({ id: 'test2', getSpeed: () => 4 }),
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
                charGen(),
                charGen({ id: 'test2', getSpeed: () => 4 }),
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
            //turn now increments on resolve
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][1]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(true);
        });

        it('registering actions with 3 characters', () => {
            const characters = [
                charGen(),
                charGen({ id: 'test2', getSpeed: () => 4 }),
                charGen({ id: 'test3', getSpeed: () => 5 }),
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
            // turns increment on resolve
            expect(battle.turns.turn).toBe(0);
            expect(battle.moves[0][2]).toEqual({ id: charId, ...fakeAction });
            expect(battle.needsResolving).toBe(true);
        });

        it('putting human first on turns, recording right order to resolve', () => {
            const characters = [
                charGen({ getSpeed: () => 4 }),
                charGen({ id: 'test2', getSpeed: () => 11 }),
                charGen({ id: 'test3', getSpeed: () => 2 }),
                charGen({ id: 'test5', getSpeed: () => 10 }),
                charGen({ id: 'human', getSpeed: () => 1, isAi: () => false }),
                charGen({ id: 'test4', getSpeed: () => 3 }),
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
                charGen(),
                charGen({ id: 'test2', getSpeed: () => 4 }),
                charGen({ id: 'test3', getSpeed: () => 2 }),
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

    describe('battleStatus', () => {
        it('returns correct info given enemies are still alive', () => {
            const characters = [
                charGen(),
                charGen({ id: 'test2', getHealthPoints: () => 0 }),
                charGen({ id: 'test3' }),
                charGen({ id: 'human', isAi: () => false }),
            ];

            const battle = new Battle(null, characters);

            expect(battle.getStatus()).toEqual({ winner: false, finished: false, deaths: ['test2'] });
        });

        it('returns correct info given player death', () => {
            const characters = [
                charGen(),
                charGen({ id: 'test2' }),
                charGen({ id: 'test3' }),
                charGen({ id: 'human', isAi: () => false, getHealthPoints: () => 0 }),
            ];

            const battle = new Battle(null, characters);

            expect(battle.getStatus()).toEqual({ winner: false, finished: true });
        });

        it('returns correct info given all enemies are dead', () => {
            const characters = [
                charGen({ getHealthPoints: () => 0 }),
                charGen({ id: 'test2', getHealthPoints: () => 0 }),
                charGen({ id: 'test3', getHealthPoints: () => 0 }),
                charGen({ id: 'human', isAi: () => false }),
            ];

            const battle = new Battle(null, characters);

            expect(battle.getStatus()).toEqual({ winner: true, finished: true, deaths: ['test1', 'test2', 'test3',] });
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

            //  turn will be incremented after resolve
            expect(battle.getCurrentTurn()).toBe(0);
            expect(battle.needsResolving).toBe(true);

            expect(humanDecider).not.toBeCalled();
        });

        it('resolves the turn when all the actions are registered', () => {
            const performActionMock = jest.fn();
            const fakeActionHuman = { type: 'a', payload: { some: 'human' } };
            const fakeActionAI = { type: 'a', payload: { some: 'ai' } };
            const characters = [
                charGen({
                    id: 'test1',
                    getSpeed: () => 3,
                    isAi: () => true,
                    decideMove: () => fakeActionAI,
                    perform: performActionMock
                }),
                charGen({
                    id: 'human',
                    getSpeed: () => 2,
                    isAi: () => false,
                    perform: performActionMock
                }),
            ];

            const battle = new Battle(null, characters);
            const human = battle.getCharacterIdTurn();
            battle.registerAction(human, fakeActionHuman.type, fakeActionHuman.payload);

            while (!battle.needsResolving) {
                const result = battle.getNextAction();
                expect(result).toBe(true);
            }
            expect(battle.needsResolving).toBe(true);

            // here we need to get an array of actions
            const { finished, currentTurnResult } = battle.resolve();

            expect(finished).toBe(false);
            expect(battle.needsResolving).toBe(false);
            expect(battle.turns.turn).toBe(1);
            expect(battle.log[battle.turns.turn - 1]).toEqual(currentTurnResult);
            console.log(JSON.stringify(currentTurnResult));
        });
    });

});