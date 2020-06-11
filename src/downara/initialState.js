import { STATUSES } from 'lib/game';
import SPRITES from './sprites';
import { NPC, LOCATIONS } from './mapObjects';

const initialWorldState = {
    objects: {
        0: {
            2: { 3: { object: NPC.MUM, sprite: SPRITES.NAMES.WOMAN } },
            5: { 4: { object: LOCATIONS.BAKERY, sprite: SPRITES.NAMES.MANSION } },
        },
        1: {
            0: { 2: { object: LOCATIONS.BEVAIO_PORTA_NUOVA }, 5: { object: LOCATIONS.CAFE_HOUSE } }
        },
        4: {
            3: { 3: { object: LOCATIONS.MATRICE } }
        },
        config: {
            [NPC.MUM]: {
                dialogue: 0,
                interaction: true
            },
            [LOCATIONS.BAKERY]: {
                dialogue: 0,
                interaction: true
            }
        }
    },
    flags: {
        0: {
            2: { 3: { type: SPRITES.FLAGS.red } }
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
    quests: [],
    status: STATUSES.IDLE,
    //status: STATUSES.FIGHTING,
    area: null,
};

export {
    initialGameState, initialWorldState
};