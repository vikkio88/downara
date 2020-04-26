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
        }
    });

    store.on('transitionOver', ({ ui }) => {
        return {
            ui: {
                ...ui,
                transition: false
            }
        }
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

        const tile = gameHelper.getTileContent(gameState, worldState, interactables, areas);
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