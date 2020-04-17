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
    getTileContent({ i, j }, tile, objects, interactables) {
        if (objects[i] && objects[i][j] && (objects[i][j]).object) {
            const tileOverwrite = (objects[i][j]);
            return { ...interactables[tileOverwrite.object], ...tileOverwrite.props };
        }

        return tile;
    },
    getFlag({ i, j }, flags) {
        if (flags[i] && flags[i][j] && (flags[i][j]).icon) {
            return (flags[i][j]).icon;
        }

        return null;
    }
};

const gameHelper = {
    getTileContent(gameState, worldState, interactables) {
        const { actionedTile, worldPosition } = gameState;
        const { objects } = worldState;
        const areaObjects = objects[worldPosition];
        return areaHelper.getTileContent(actionedTile.position, actionedTile, areaObjects, interactables);
    },
    updateWorldStatePostDialogue(worldState, gameState, payload) {
        const { actionedTile: { position }, worldPosition } = gameState;
        // maybe consider using optional chaining?
        if (worldState.objects[worldPosition] && worldState.objects[worldPosition][position.i]
            && worldState.objects[worldPosition][position.i][position.j]
            && worldState.objects[worldPosition][position.i][position.j].props) {
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