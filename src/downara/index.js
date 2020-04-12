import { DIRECTIONS, ACTIONS } from 'lib/game';
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
        0: { 0: { 0: { object: NPC.MUM } } }
    }
};

export {
    map,
    npcs,
    NPC,
    OBJECT_DESCRIPTIONS,
    initialWorldState,
    AREA,
    DIRECTIONS_LABELS,
    ACTIONS_LABELS
};