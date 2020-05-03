import { Character, FACING, ACTIONS, AI } from './Character';
import { Field } from 'components/battle';

describe('Character', () => {
    const id = 'someId';
    const config = {};
    const inventory = {};
    const position = { i: 0, j: 0 };
    const facing = FACING.RIGHT;


    describe('positioning and movements', () => {
        test('setting initial position and faced direction', () => {
            const initialPosition = { i: 1, j: 1 };
            const character = new Character(id, config, inventory, initialPosition, FACING.UP);

            expect(character.getPosition()).toBe(initialPosition);
            expect(character.getFacing()).toBe(FACING.UP);
        });

        test('facing direction change with valid input', () => {
            const character = new Character(id, config, inventory, position, facing);

            character.setFacing(FACING.DOWN);
            expect(character.getFacing()).toBe(FACING.DOWN);
        });

        test('facing direction change with invalid input', () => {
            const character = new Character(id, config, inventory, position, FACING.LEFT);

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

    describe('ai decision test', () => {
        describe('Simple position based', () => {
            it('decides to move towards the human player if they are out of range', () => {
                const distanceMock = jest.fn();
                distanceMock.mockReturnValueOnce(2);
                const battle = {
                    getHumanPosition: () => ({ i: 0, j: 2 }),
                    field: {
                        tilesDistance: distanceMock,
                        nextStepToTile: () => ({ i: 0, j: 1 })
                    }
                };

                const inventory = {
                    getWeapon: () => ({ getReach: () => 1 })
                };
                const aiCharPosition = { i: 0, j: 0 };
                const aiCharacter = new Character(id, config, inventory, aiCharPosition);

                const decidedMove = aiCharacter.decideAction(battle);
                expect(distanceMock).toHaveBeenCalled();
                expect(decidedMove.type).toBe(ACTIONS.MOVE);
                expect(decidedMove.payload).toEqual({ position: { i: 0, j: 1 } });
            });

            it('decides to attack the human tile if the human is in range', () => {
                const distanceMock = jest.fn();
                const nextStepMock = jest.fn();
                distanceMock.mockReturnValueOnce(1);
                const battle = {
                    getHumanPosition: () => ({ i: 0, j: 1 }),
                    field: {
                        tilesDistance: distanceMock,
                        nextStepToTile: nextStepMock
                    }
                };

                const inventory = {
                    getWeapon: () => ({ getReach: () => 1 })
                };
                const aiCharPosition = { i: 0, j: 0 };
                const aiCharacter = new Character(id, config, inventory, aiCharPosition);

                const decidedMove = aiCharacter.decideAction(battle);
                expect(distanceMock).toHaveBeenCalled();
                expect(nextStepMock).not.toHaveBeenCalled();
                expect(decidedMove.type).toBe(ACTIONS.ATTACK);
                expect(decidedMove.payload).toEqual({ position: { i: 0, j: 1 } });
            });

            it('decides to parry if the human is in range and defensiveness is 100%', () => {
                const distanceMock = jest.fn();
                const nextStepMock = jest.fn();
                distanceMock.mockReturnValueOnce(1);
                const battle = {
                    getHumanPosition: () => ({ i: 0, j: 1 }),
                    field: {
                        tilesDistance: distanceMock,
                        nextStepToTile: nextStepMock
                    }
                };

                const inventory = {
                    getWeapon: () => ({ getReach: () => 1 })
                };
                const aiCharPosition = { i: 0, j: 0 };
                const aiCharacter = new Character(
                    id,
                    {
                        ai: {
                            config: {
                                logic: AI.SIMPLE,
                                traits: {
                                    defensiveness: 100
                                }
                            }
                        }
                    },
                    inventory,
                    aiCharPosition
                );

                const decidedMove = aiCharacter.decideAction(battle);
                expect(distanceMock).toHaveBeenCalled();
                expect(nextStepMock).not.toHaveBeenCalled();
                expect(decidedMove.type).toBe(ACTIONS.PARRY);
                expect(decidedMove.payload).toEqual({ position: { i: 0, j: 1 } });
            });
        });

        describe('Random choice', () => {
            it('decides to a random move', () => {
                const distanceMock = jest.fn();
                const nextStepMock = jest.fn();
                distanceMock.mockReturnValueOnce(1);
                const battle = {
                    getHumanPosition: () => ({ i: 0, j: 1 }),
                    field: {
                        tilesDistance: distanceMock,
                        nextStepToTile: nextStepMock
                    }
                };

                const inventory = {
                    getWeapon: () => ({ getReach: () => 1 })
                };
                const aiCharPosition = { i: 0, j: 0 };
                const aiCharacter = new Character(
                    id,
                    { ai: { config: { logic: AI.RANDOM } } },
                    inventory,
                    aiCharPosition
                );

                const decidedMove = aiCharacter.decideAction(battle);
                expect(distanceMock).toHaveBeenCalled();
                expect(nextStepMock).not.toHaveBeenCalled();
                expect(decidedMove.type).toBe(ACTIONS.PARRY);
                expect(decidedMove.payload).toEqual({ position: { i: 0, j: 1 } });
            });
        });
    });

});