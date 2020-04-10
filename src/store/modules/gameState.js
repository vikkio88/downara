import { mapHelper, initialGameState } from 'lib/game';
import { map } from 'downara';
export default store => {
    store.on('@init', () => ({ gameState: { ...initialGameState, area: map[0] } }));

    store.on('move', ({ gameState }, direction) => {
        const { result, payload: { position } } = mapHelper.move(direction, map, gameState.position);
        if (result) {
            return { gameState: { ...gameState, position, area: map[position] } }
        }
    });
}