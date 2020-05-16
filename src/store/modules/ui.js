import { interactables, OBJECT_DESCRIPTIONS, map } from 'downara';
import areas from 'downara/areas';
import { gameHelper, areaHelper, MESSAGE_TYPES } from 'lib/game';


export default store => {
    store.on('@init', () => {
        return {
            ui: {
                message: null,
                // Temp to test
                //view: VIEWS.INVENTORY,
                view: null,
                notification: null,
                transition: false,
                transitionMessage: null
            }
        };
    });

    store.on('transition', ({ ui }, { duration = 2000, message = null } = {}) => {
        if (duration) setTimeout(() => store.dispatch('transitionOver'), duration);
        return {
            ui: {
                ...ui,
                transition: { message: message || '' }
            }
        };
    });

    store.on('transitionOver', ({ ui }) => {
        return {
            ui: {
                ...ui,
                transition: false
            }
        };
    });

    store.on('error', ({ ui }, message) => {
        return { ui: { ...ui, message: { message, type: MESSAGE_TYPES.ERROR } } };
    });

    store.on('message', ({ ui }, message) => {
        console.log('newMessage', message);
        return { ui: { ...ui, message: { message, type: MESSAGE_TYPES.INFO } } };
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

        const tile = gameHelper.getTileContent(gameState, worldState, interactables, areas);
        store.dispatch('message', tile.description || OBJECT_DESCRIPTIONS.default);
        return;
    });

    store.on('changeView', ({ ui }, view) => {
        return { ui: { ...ui, view: view, notification: null } };
    });

    store.on('clearMessage', ({ ui }) => {
        if (!ui.message) return;

        return {
            ui: {
                ...ui,
                message: null
            }
        };
    });

};