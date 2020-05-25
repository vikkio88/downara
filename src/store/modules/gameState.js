import { areaHelper, STATUSES, gameHelper } from 'lib/game';
import { initialGameState, map, interactables } from 'downara';
import { eventBridge } from 'lib';
import dialogues from 'downara/dialogues';
import { MESSAGES } from 'downara/mapObjects';
import quests from 'downara/quests';

// replacement for areas
import { areas } from 'downara/areas';

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
        eventBridge.emit('game:areaInit', {
            gameState,
            worldState
        });
        return;
    });

    store.on('areaUpdate', ({ }, payload) => {
        eventBridge.emit('game:areaUpdate', payload);
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
        // first test of phaser interaction update
        if (areaHelper.isSameTile({ i: 1, j: 0 }, gameState.actionedTile.position)) {
            store.dispatch('areaUpdate', {
                flags: {
                    remove: [{ i: 2, j: 3 }],
                    add: [{ i: 2, j: 4, type: 'red' }]
                },
                objects: {
                    remove: [{ i: 2, j: 3 }],
                    add: [{ i: 6, j: 6, sprite: 'woman' }]
                }
            }
            );
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
        console.log('changeArea', { newArea, currentWorldPosition, newAreaPosition });
        return;

        gameState.player.areaPosition = newAreaPosition;
        gameState.actionedTile.position = newAreaPosition;
        return { gameState: { ...gameState, worldPosition: newArea, area: map[newArea] } };
    });
};