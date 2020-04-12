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

const initialGameState = {
    worldPosition: 0,
    player: {
        life: 100,
        areaPosition: { i: 3, j: 2 }
    },
    status: STATUSES.IDLE,
    area: null,
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
    getObject({ i, j }, tile, objects, npcs) {
        const { object } = tile;
        if (objects[i] && objects[i][j] && (objects[i][j]).object) {
            return npcs[(objects[i][j]).object].object;
        }

        return object;
    }
}

export {
    initialGameState,
    mapHelper, areaHelper,
    DIRECTIONS, STATUSES,
    ACTIONS
};