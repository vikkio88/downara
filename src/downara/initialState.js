import { STATUSES } from 'lib/game';
import { NPC, LOCATIONS, FLAGS } from './mapObjects';

const initialWorldState = {
    objects: {
        0: {
            2: { 3: { object: NPC.MUM, props: { dialogue: 0 } } },
            5: { 4: { object: LOCATIONS.BAKERY } },
        },
        1: {
            0: { 2: {object: LOCATIONS.BEVAIO_PORTA_NUOVA}, 5: { object: LOCATIONS.CAFE_HOUSE } }
        },
        4: {
            3: { 3: { object: LOCATIONS.MATRICE } }
        }
    },
    flags: {
        0: {
            2: { 3: { icon: FLAGS.FLAG_RED } }
        }
    }
};


const initialGameState = {
    worldPosition: 0,
    player: {
        hp: 100,
        stats: {},
        icon: 'man',
        areaPosition: { i: 3, j: 2 }
    },
    inventory: {
        maxWeight: 10,
        money: 0,
    },
    //status: STATUSES.IDLE,
    status: STATUSES.FIGHTING,
    area: null,
};

export {
    initialGameState, initialWorldState
};