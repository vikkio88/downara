import { STATUSES } from 'lib/game';

const initialGameState = {
    level: 0,
    status: STATUSES.IDLE,
    player: {
        name: null
    }
};

export {
    initialGameState
};