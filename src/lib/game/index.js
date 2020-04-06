const gameState = {
    position: 0,
    player: {
        life: 100,
    }
};

const DIRECTIONS = {
    NORTH: 'north',
    SOUTH: 'south',
    EAST: 'east',
    WEST: 'west',
};

const helper = {
    move(direction, map, position) {
        if (map[position][direction] == undefined) {
            return { result: false, payload: { position } };
        }

        return { result: true, payload: { position: map[position][direction] } };
    }
}

export { gameState, helper, DIRECTIONS };