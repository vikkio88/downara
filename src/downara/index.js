import { DIRECTIONS, ACTIONS, STATUSES } from 'lib/game';
import { interactables, NPC, LOCATIONS, OBJECT_DESCRIPTIONS } from './mapObjects';
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
        0: {
            2: { 3: { object: NPC.MUM } },
            5: { 4: { object: LOCATIONS.BAKERY } },
        }
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
    interactables,
    NPC,
    LOCATIONS,
    OBJECT_DESCRIPTIONS,
    AREA,
    DIRECTIONS_LABELS,
    ACTIONS_LABELS
};