import { helper } from 'lib/game';
import { map } from 'lib/game/models';

export default store => {
    store.on('@init', () => ({ gameState: { position: 0 }, error: null }));

    store.on('move', ({ gameState }, direction) => {
        const { result, payload: { position } } = helper.move(direction, map, gameState.position);
        if (result) {
            return { gameState: { ...gameState, position } }
        }
    });
}