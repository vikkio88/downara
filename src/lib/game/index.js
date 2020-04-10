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
    INTERACT: 'interact'
};

const initialGameState = {
    position: 0,
    player: {
        life: 100,
    },
    status: STATUSES.IDLE,
    area: null,
};

const mapHelper = {
    move(direction, map, position) {
        if (this.isValidDirection(map[position][direction])) {
            return { result: false, payload: { position } };
        }

        return { result: true, payload: { position: map[position][direction] } };
    },
    isValidDirection(positionDirection) {
        return positionDirection === undefined || positionDirection === null;
    }
};

export {
    initialGameState, mapHelper,
    DIRECTIONS, STATUSES,
    ACTIONS
};