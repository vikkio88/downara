import { eventBridge } from 'lib';

// battle classes
import { Battle, ACTIONS } from 'lib/battle/Battle';
import { Field } from 'lib/battle/Field';
import { Character } from 'lib/battle/Character';
//

const ACTIONS_TARGETS = [ACTIONS.MOVE, ACTIONS.ATTACK];

export default store => {
    store.on('@init', () => {
        return {
            battle: {
                tile: null,
                action: null,
                selectedCharacters: [],
                lock: false
            },
        };
    });

    store.on('battle:init', ({ battle }, payload) => {
        // here most likely will init all the lib/battle classes
        const { size, actors } = payload;
        // actors are  ↑ sent in gameState to phaser

        const characters = [];
        const actorsCharacter = [];
        for (const actor of actors) {
            const char = Character.fromActor(actor);
            characters.push(char);
            actorsCharacter.push({
                ...actor,
                character: char.toJs()
            });

        }
        const battleInstance = new Battle(
            new Field({ size }),
            characters
        );
        eventBridge.emit('game:battle', {
            size,
            actors: actorsCharacter
        });

        return {
            battle: {
                ...battle,
                battleInstance,
                actors,
            }
        };
    });

    store.on('battle:cancelSelectedAction', ({ battle }) => {
        eventBridge.emit('battle:resetActionableTiles');
        return {
            battle: {
                ...battle,
                action: null,
                confirmation: false
            }
        };
    });

    store.on('battle:actionSelected', ({ battle }, action) => {
        console.log('action selected', action);
        const { battleInstance } = battle;
        if (!ACTIONS_TARGETS.includes(action)) {
            //store.dispatch('battle:actionConfirmed');
            return {
                battle: {
                    ...battle,
                    action,
                    confirmation: true
                }
            };
        }
        // some action need a tile to select and a radius
        // like moving
        const tiles = battleInstance.field.getFlatTilesAtRange(
            battleInstance.getHumanPosition()
        );

        // some like attack wont need this
        eventBridge.emit('battle:showActionableTiles', { tiles });

        return {
            battle: {
                ...battle,
                action
            }
        };
    });

    store.on('battle:actionConfirmed', ({ battle }, position) => {
        const { battleInstance } = battle;
        // calculate moves
        const human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, battle.action, { position: position });
        battleInstance.loop();
        const { finished, winner, currentTurnResult } = battleInstance.resolve();
        console.log('TURN RESOLVED:', { finished, winner, currentTurnResult });

        eventBridge.emit('battle:resolved', currentTurnResult);
        return {
            battle: {
                ...battle,
                tile: null,
                action: null,
                confirmation: null,
                lock: true
            }
        };
    });

    store.on('battle:unlock', ({ battle }) => {
        // here we check if finished
        const { battleInstance } = battle;
        const { finished, winner } = battleInstance.getStatus();
        if (finished) {
            store.dispatch('battle:finished', winner);
            // I wont unlock if finished
            return;
        }
        return {
            battle: {
                ...battle,
                lock: false
            }
        };
    });

    store.on('battle:unselectCharacter', ({ battle }, unselectedId) => {
        return {
            battle: {
                ...battle,
                selectedCharacters: battle.selectedCharacters.filter(c => c.id !== unselectedId)
            }
        };
    });
    store.on('battle:showInfo', ({ battle }, id) => {
        if (battle.action) return;
        const { selectedCharacters, battleInstance } = battle;
        if (selectedCharacters.filter(c => c.id === id).length > 0) return;

        const character = battleInstance.getCharacter(id);
        return {
            battle: {
                ...battle,
                selectedCharacters: [...selectedCharacters, character]
            }
        };
    });

    store.on('battle:finished', ({ battle }, winner) => {
        eventBridge.emit('battle:finished', winner);
        console.log('battle finished');

        return {
            battle: {
                ...battle,
                selectedCharacters: [],
                lock: true
            }
        };

        // maybe here we generate loot 
        // or we make the user go back to the main menu
    });
};