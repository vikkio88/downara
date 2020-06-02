import { pg, eventBridge } from 'lib';
import { Field } from 'lib/battle/Field';
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
        const field = new Field({ size });
        return {
            battle: {
                ...battle,
                field,
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
        // some action need a tile to select and a radius
        // like moving
        const tiles = battle.field.getFlatTilesAtRange(pg(0, 1));

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


        // HERE we need to register human action
        // calculate moves
        // send them to phaser to play
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