import { pg, eventBridge } from 'lib';

// battle classes
import { Battle } from 'lib/battle/Battle';
import { Field } from 'lib/battle/Field';
//

import { ACTIONS } from 'lib/game';
import { Character } from 'lib/battle/Character';
export default store => {
    store.on('@init', () => {
        return {
            battle: {
                tile: null,
                action: null,
            },
        };
    });

    store.on('battle:init', ({ battle }, payload) => {
        // here most likely will init all the lib/battle classes
        const { size, actors } = payload;
        // actors are  ↑ sent in gameState to phaser
        const characters = [];
        for (const actor of actors) {
            const { id, i, j, facing, ai = false } = actor;
            characters.push(
                new Character(id, { ai }, null, { i, j }, facing)
            );
        }
        const battleInstance = new Battle(
            new Field({ size }),
            characters
        );

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
                action: null
            }
        };
    });

    store.on('battle:actionSelected', ({ battle }, action) => {
        console.log('action selected', action);
        const { battleInstance } = battle;
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

    store.on('battle:tileClicked', ({ battle }, position) => {
        const { battleInstance } = battle;
        console.log('clicked', position);
        // HERE we need to register human action
        // calculate moves
        const human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, battle.action, { position });
        console.log('actions registered');
        while (!battleInstance.needsResolving) {
            console.log('does not need resolving yet');
            const result = battleInstance.getNextAction();
            console.log('got action AI: ', result);
        }
        const { finished, currentTurnResult } = battleInstance.resolve();
        console.log('resolved', { finished, currentTurnResult });

        eventBridge.emit('battle:resolved', currentTurnResult);
        // wait for them to play in order to reset

        // at the moment I am just resetting
        return {
            battle: {
                ...battle,
                tile: { ...position },
                action: null
            }
        };
    });

};