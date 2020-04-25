import get from 'lodash.get';

const STATUSES = {
    IDLE: 'idle',
    SPEAKING: 'speaking',
    FIGHTING: 'fighting',
};

const DIRECTIONS = {
    NORTH: 'north',
    SOUTH: 'south',
    EAST: 'east',
    WEST: 'west',
};

const ACTIONS = {
    EXAMINE: 'examine',
    INTERACT: 'interact',
    MOVE: 'move'
};

const VIEWS = {
    INVENTORY: 'inventory',
    JOURNAL: 'journal',
    MAP: 'map',
    PROFILE: 'profile',
    SETTINGS: 'settings',
};

const mapHelper = {
    move(direction, map, currentPosition) {
        if (this.isValidDirection(map[currentPosition][direction])) {
            return { result: false, payload: { worldPosition: currentPosition } };
        }

        return { result: true, payload: { worldPosition: map[currentPosition][direction] } };
    },
    isValidDirection(positionDirection) {
        return positionDirection === undefined || positionDirection === null;
    }
};

const areaHelper = {
    isTileActionable(playerPosition, i, j, maxD = 1) {
        return this.isPlayerInTile(playerPosition, i, j)
            || this.isAdjacent(playerPosition, { i, j }, maxD);
    },
    isPlayerInTile({ i, j }, mapI, mapJ) {
        return i === mapI && j === mapJ;
    },
    isAdjacent({ i: pi, j: pj }, { i: p1i, j: p1j }, maxD = 1) {
        return Math.abs(pi - p1i) <= maxD && Math.abs(pj - p1j) <= maxD;
    },
    isSameTile({ i, j }, { i: i1, j: j1 }) {
        return i === i1 && j === j1;
    },
    getLink(gameState, areas) {
        const tileConfig = this.getAreaTileConfig(gameState, areas);
        if (tileConfig.link !== undefined) {
            return tileConfig.link;
        }

        return null;
    },
    getAreaTileConfig({ worldPosition, actionedTile: { position } }, areas) {
        const { i, j } = position;
        return areas[worldPosition][i][j];
    },
    getTileContent({ i, j }, tile, objects, interactables) {
        if (tile.link !== undefined) {
            return {
                ...tile,
                object: 'road_sign'
            };

        }
        if (objects && get(objects, `${i}.${j}.object`)) {
            const tileOverwrite = (objects[i][j]);
            return { ...interactables[tileOverwrite.object], ...tileOverwrite.props };
        }

        return tile;
    },
    getFlag({ i, j }, flags) {
        if (flags && get(flags, `${i}.${j}.icon`)) {
            return (flags[i][j]).icon;
        }

        return null;
    },
    addFlag(worldPosition, areaPosition, flagsWrapper, flag) {
        const { i, j } = areaPosition;
        const worldPositionFlags = get(flagsWrapper, `flags.${worldPosition}`, {});
        const worldPositionRowFlags = get(flagsWrapper, `flags.${worldPosition}.${i}`, {});
        const newFlag = { [worldPosition]: { ...worldPositionFlags, [i]: { ...worldPositionRowFlags, [j]: { icon: flag } } } };
        return {
            flags: {
                ...flagsWrapper.flags,
                ...newFlag
            }
        }

    },
    removeFlag(worldPosition, areaPosition, flagsWrapper) {
        const { i, j } = areaPosition;
        delete flagsWrapper.flags[worldPosition][i][j];
        return flagsWrapper;
    }
};

const gameHelper = {
    getTileContent(gameState, worldState, interactables, areas = null) {
        const { actionedTile, worldPosition } = gameState;
        const tile = areas ? areaHelper.getAreaTileConfig(gameState, areas) : actionedTile;
        const { objects } = worldState;
        const areaObjects = objects[worldPosition];
        return areaHelper.getTileContent(actionedTile.position, tile, areaObjects, interactables);
    },
    updateWorldStatePostDialogue(worldState, gameState, payload) {
        const { actionedTile: { position }, worldPosition } = gameState;
        if (get(worldState, `objects.${worldPosition}.${position.i}.${position.j}.props`)) {
            const { newDialoguePointer = 0 } = payload;
            worldState.objects[worldPosition][position.i][position.j].props.dialogue = newDialoguePointer;
        }
        return worldState;
    },
    updateGameStatePostDialogue() {

    }
};

export {
    mapHelper, areaHelper, gameHelper,
    DIRECTIONS, STATUSES,
    ACTIONS, VIEWS
};