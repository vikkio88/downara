
import { initialWorldState } from 'downara';
import { gameHelper } from 'lib/game';

export default store => {
    store.on('@init', () => {
        return {
            worldState: { ...initialWorldState },
        }
    });

    store.on('updateWorldPostDialogue', ({ worldState, gameState }, payload) => {
        return gameHelper.updateWorldStatePostDialogue(worldState, gameState, payload);
    });

};