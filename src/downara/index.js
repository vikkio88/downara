import { ACTIONS, STATUSES } from 'lib/game';
import { interactables, NPC, LOCATIONS, OBJECT_DESCRIPTIONS } from './mapObjects';
import map from './map';
import LABELS from './labels';

const FLAGS = {
    FLAG_RED: 'flag_red',
    FLAG_YELLOW: 'flag_yellow',
    FLAG_GREEN: 'flag_green',
    FLAG_BLUE: 'flag_blue',
    ARROW_UP: 'arrow_u',
    ARROW_BOTTOM: 'arrow_b',
    ARROW_RIGHT: 'arrow_r',
    ARROW_LEFT: 'arrow_l',
    ARROW_B_LEFT: 'arrow_bl',
    ARROW_B_RIGHT: 'arrow_br',
    ARROW_U_LEFT: 'arrow_ul',
    ARROW_U_RIGHT: 'arrow_ur',
};

const ACTIONS_LABELS = {
    [ACTIONS.EXAMINE]: 'Esamina',
    [ACTIONS.INTERACT]: 'Interagisci',
    [ACTIONS.MOVE]: 'Spostati',
};

const AREA = {
    size: {
        x: 6,
        y: 6,
    }
};


const initialWorldState = {
    objects: {
        0: {
            2: { 3: { object: NPC.MUM, props: { dialogue: 0 } } },
            5: { 4: { object: LOCATIONS.BAKERY } },
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
        icon: 'man_1',
        areaPosition: { i: 3, j: 2 }
    },
    status: STATUSES.IDLE,
    area: null,
};

export {
    initialGameState,
    initialWorldState,
    map,
    interactables,
    FLAGS,
    NPC,
    LOCATIONS,
    OBJECT_DESCRIPTIONS,
    AREA,
    ACTIONS_LABELS,
    LABELS
};