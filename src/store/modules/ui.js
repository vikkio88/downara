import { npcs, OBJECT_DESCRIPTIONS } from 'downara';
import { areaHelper } from 'lib/game';

export default store => {
    store.on('@init', () => {
        return {
            ui: {
                message: null
            }
        };
    });

    store.on('examine', ({ ui, worldState, gameState }) => {
        const { actionedTile, worldPosition } = gameState;
        const { objects } = worldState;
        const areaObjects = objects[worldPosition];
        const tile = areaHelper.getTileContent(actionedTile.position, actionedTile, areaObjects, npcs);
        return {
            ui: {
                ...ui,
                message: tile.description || OBJECT_DESCRIPTIONS.default
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