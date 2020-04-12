import { DIRECTIONS, ACTIONS, STATUSES } from 'lib/game';
import { NPC, npcs, OBJECT_DESCRIPTIONS } from './npcs';
import map from './map';

const DIRECTIONS_LABELS = {
    [DIRECTIONS.NORTH]: '↑',
    [DIRECTIONS.SOUTH]: '↓',
    [DIRECTIONS.EAST]: '←',
    [DIRECTIONS.WEST]: '→',
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
        0: { 3: { 3: { object: NPC.MUM } } }
    }
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

export {
    initialGameState,
    initialWorldState,
    map,
    npcs,
    NPC,
    OBJECT_DESCRIPTIONS,
    AREA,
    DIRECTIONS_LABELS,
    ACTIONS_LABELS
};