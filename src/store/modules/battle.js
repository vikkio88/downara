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
                selectedEnemyId: null,
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
        console.log('canceling');
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
        console.log('clicked', position);
        // HERE we need to register human action
        // calculate moves
        const human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, battle.action, { position: position });
        battleInstance.loop();
        const { finished, currentTurnResult } = battleInstance.resolve();
        console.log('resolved', { finished, currentTurnResult });

        eventBridge.emit('battle:resolved', currentTurnResult);
        // wait for them to play in order to reset

        // at the moment I am just resetting
        return {
            battle: {
                ...battle,
                tile: null,
                action: null,
                confirmation: null
            }
        };
    });

    store.on('battle:unselectEnemy', ({ battle }) => {
        return {
            battle: {
                ...battle,
                selectedEnemyId: null
            }
        };
    });
    store.on('battle:selectEnemy', ({ battle }, enemyId) => {
        if (battle.action) return;
        return {
            battle: {
                ...battle,
                selectedEnemyId: enemyId
            }
        };
    });
};