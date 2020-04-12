export default store => {
    store.on('@init', () => {
        return {
            ui: {
                message: null
            }
        };
    });

    store.on('examine', ({ ui }, tile) => {
        return {
            ui: {
                ...ui,
                message: tile.description || 'Nothing here'
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