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

const initialGameState = {
    position: 0,
    player: {
        life: 100,
    },
    status: STATUSES.IDLE,
    area: null,
};

const helper = {
    move(direction, map, position) {
        if (map[position][direction] == undefined) {
            return { result: false, payload: { position } };
        }

        return { result: true, payload: { position: map[position][direction] } };
    }
}

export { initialGameState, helper, DIRECTIONS };