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

    store.on('battle:actionSelected', ({ battle }, action) => {
        console.log('action selected', action);
        const tiles = battle.field.getFlatTilesAtRange(pg(0, 1));
        console.log('TILES', tiles);
        eventBridge.emit('battle:showActionableTiles', { tiles });
    });

    store.on('battle:tileClicked', ({ battle }, position) => {
        console.log('clicked tile', position);
        return {
            battle: {
                ...battle,
                tile: { ...position }
            }
        };
    });

};