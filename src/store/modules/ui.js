import { interactables, OBJECT_DESCRIPTIONS, map } from 'downara';
import areas from 'downara/areas';
import { gameHelper, VIEWS, areaHelper } from 'lib/game';


export default store => {
    store.on('@init', () => {
        return {
            ui: {
                message: null,
                // Temp to test
                //view: VIEWS.INVENTORY,
                view: null,
                notification: null
            }
        };
    });

    store.on('message', ({ ui }, message) => {
        return { ui: { message } };
    });

    store.on('notify', ({ ui }, notification) => {
        return { ui: { ...ui, notification: notification } };
    });

    store.on('examine', ({ ui, worldState, gameState }) => {
        const link = areaHelper.getLink(gameState, areas);
        if (link !== null) {
            store.dispatch('message', OBJECT_DESCRIPTIONS.ROAD_SIGN(map[link].label));
            return;
        }

        const tile = gameHelper.getTileContent(gameState, worldState, interactables);
        return {
            ui: {
                ...ui,
                message: tile.description || OBJECT_DESCRIPTIONS.default
            }
        };
    });

    store.on('changeView', ({ ui }, view) => {
        return { ui: { ...ui, view: view, notification: null } };
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