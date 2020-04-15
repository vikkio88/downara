import { areaHelper, STATUSES, gameHelper } from 'lib/game';
import { initialGameState, map, interactables } from 'downara';
import dialogues from 'downara/dialogues';
import { MESSAGES } from 'downara/mapObjects';

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

    store.on('interact', ({ gameState, worldState }) => {
        const tileObject = gameHelper.getTileContent(gameState, worldState, interactables);
        if (!tileObject.interaction) {
            store.dispatch('message', MESSAGES.INVALID_INTERACTION);
            return;
        }

        const { name, id } = tileObject;
        store.dispatch('initDialogue', { participant: { name, id }, lines: dialogues[tileObject.id][tileObject.dialogue] });

        return {
            gameState: {
                ...gameState,
                status: STATUSES.SPEAKING
            }
        };
    });

    store.on('stopDialogue', ({ gameState }) => {
        store.dispatch('clearDialogue');
        return {
            gameState: {
                ...gameState,
                status: STATUSES.IDLE
            }
        };
    });

    store.on('postDialogue', ({ gameState }, postDialogue) => {
        if (postDialogue.worldState) {
            // I could set flag here too for the quest
            store.dispatch('updateWorldPostDialogue', { postDialogue })
        }

        if (postDialogue.gameState) {
            // but probably is better to keep the flag alongside the quest
            gameHelper.updateGameStatePostDialogue();
        }
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