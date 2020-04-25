import { battleHelper } from 'lib/battle';

export default store => {
    store.on('@init', () => {
        return {
            battle: {
                selectedTile: { position: { i: 1, j: 1 } }
            },
        }
    });

    store.on('battle:clickTile', ({ battle }, position) => {
        console.log('clicked tile', position);
        return {
            battle: {
                ...battle,
                selectedTile: {
                    ...battle.selectedTile,
                    position
                }
            }
        }
    });

};