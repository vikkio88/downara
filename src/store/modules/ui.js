import { interactables, OBJECT_DESCRIPTIONS } from 'downara';
import { gameHelper } from 'lib/game';

export default store => {
    store.on('@init', () => {
        return {
            ui: {
                message: null
            }
        };
    });

    store.on('message', ({ ui }, message) => {
        return { ui: { message } };
    });

    store.on('examine', ({ ui, worldState, gameState }) => {
        const tile = gameHelper.getTileContent(gameState, worldState, interactables);
        return {
            ui: {
                ...ui,
                message: tile.description || OBJECT_DESCRIPTIONS.default
            }
        };
    });

    store.on('clearMessage', ({ ui }) => {
        return {
            ui: {
                ...ui,
                message: null
            }
        };
    });

};