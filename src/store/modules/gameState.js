import { areaHelper, STATUSES, gameHelper } from 'lib/game';
import { initialGameState, map, interactables } from 'downara';
import { eventBridge } from 'lib';
import dialogues from 'downara/dialogues';
import { MESSAGES } from 'downara/mapObjects';
import areas from 'downara/areas';
import quests from 'downara/quests';

export default store => {
    store.on('@init', () => {
        const { player: { areaPosition } } = initialGameState;
        return {
            gameState: {
                ...initialGameState,
                area: map[0],
                actionedTile: {
                    position: areaPosition
                },
                tilesEffect: {},
                triggers: {
                    casualEncounter: false
                }
            },
        };
    });

    store.on('phaserReady', ({ gameState, worldState }) => {
        console.log('[gameState] phaser ready received');
        eventBridge.emit('game:worldInit', {
            gameState,
            worldState
        });
        return;
    });

    store.on('actioned', ({ gameState }, tilePosition) => {
        store.dispatch('clearMessage');
        return {
            gameState: {
                ...gameState,
                actionedTile: {
                    ...gameState.actionedTile,
                    position: tilePosition
                }
            }
        };
    });

    store.on('movedToTile', ({ gameState }, newPosition) => {
        console.log('moved to tile', newPosition);
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
        };
    });

    store.on('interact', ({ gameState, worldState }) => {
        if (areaHelper.isSameTile({ i: 1, j: 0 }, gameState.actionedTile.position)) {
            store.dispatch('transition', { message: 'Test Battle' });
            store.dispatch('toggleFightingTest');
            return;
        }


        const link = areaHelper.getLink(gameState, areas);
        if (link !== null) {
            store.dispatch('changeArea', link);
            return;
        }

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
            // test for notification
            store.dispatch('notify', { inventory: true });

            // I could set flag here too for the quest
            store.dispatch('updateWorldPostDialogue', postDialogue);
        }

        if (postDialogue.gameState) {
            gameState = gameHelper.updateGameStatePostDialogue(gameState, postDialogue, quests);
        }

        return { gameState };
    });

    store.on('changeArea', ({ gameState }, newArea) => {
        const currentWorldPosition = gameState.worldPosition;
        const newAreaPosition = map[newArea][currentWorldPosition];
        gameState.player.areaPosition = newAreaPosition;
        gameState.actionedTile.position = newAreaPosition;
        return { gameState: { ...gameState, worldPosition: newArea, area: map[newArea] } };
    });

    // For test purposes
    store.on('toggleFightingTest', ({ gameState }) => {
        gameState.status = gameState.status === STATUSES.FIGHTING ?
            STATUSES.IDLE : STATUSES.FIGHTING;
        return { gameState: { ...gameState } };
    });
};