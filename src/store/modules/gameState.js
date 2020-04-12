import { initialGameState, areaHelper, STATUSES } from 'lib/game';
import { map } from 'downara';

export default store => {
    store.on('@init', () => {
        const { player: { areaPosition } } = initialGameState;
        return {
            gameState: {
                ...initialGameState,
                area: map[0],
                actionedTile: {
                    position: areaPosition
                }
            },
        }
    });

    store.on('actioned', ({ gameState }, tilePosition) => {
        store.dispatch('clearMessage');
        const { player, actionedTile } = gameState;
        if (!areaHelper.isPlayerInTile(player.areaPosition, tilePosition)
            && areaHelper.isSameTile(actionedTile.position, tilePosition)
        ) {
            store.dispatch('moveToTile', tilePosition);
            return;
        }

        return {
            gameState: {
                ...gameState,
                actionedTile: {
                    ...gameState.actionedTile,
                    position: tilePosition
                }
            }
        }
    });

    store.on('moveToTile', ({ gameState }, newPosition) => {
        return {
            gameState: {
                ...gameState,
                player: {
                    ...gameState.player,
                    areaPosition: newPosition
                },
                actionedTile: {
                    position: newPosition
                }
            },
        }
    });

    store.on('interact', ({ gameState }, tile) => {
        return {

        };
    });

    /*
    to move out of bounds
    store.on('move', ({ gameState }, direction) => {
        const { result, payload: { worldPosition } } = mapHelper.move(direction, map, gameState.worldPosition);
        if (result) {
            return { gameState: { ...gameState, worldPosition, area: map[worldPosition] } }
        }
    });
    */


}