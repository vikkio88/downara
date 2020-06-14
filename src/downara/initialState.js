import { STATUSES } from 'lib/game';

const initialGameState = {
    level: 0,
    status: STATUSES.IDLE,
    player: {
        name: null
    },
    inventory: {
        maxWeight: 10,
        money: 0,
    }
};

export {
    initialGameState
};