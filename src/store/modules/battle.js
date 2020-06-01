import { pg, eventBridge } from 'lib';
export default store => {
    store.on('@init', () => {
        return {
            battle: {
                selectedTile: { position: { i: 1, j: 1 } },
                action: null
            },
        };
    });

    store.on('battle:actionSelected', ({ battle }, action) => {
        console.log('action selected', action);
        const tiles = [
            { ...pg(0, 0) },
            { ...pg(0, 1) },
            { ...pg(1, 0) },
            { ...pg(1, 1) },
        ];

        eventBridge.emit('battle:showActionableTiles', { tiles });
    });

    store.on('battle:tileClicked', ({ battle }, position) => {
        console.log('clicked tile', position);
        return {
            battle: {
                ...battle,
                selectedTile: {
                    ...battle.selectedTile,
                    position
                }
            }
        };
    });

};