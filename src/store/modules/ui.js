import { MESSAGE_TYPES } from 'lib/game';


export default store => {
    store.on('@init', () => {
        return {
            ui: {
                message: null,
                // Temp to test
                //view: VIEWS.INVENTORY,
                view: null,
                notification: null,
                transitionMessage: null
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