import { DIRECTIONS, ACTIONS } from 'lib/game';
import map from './map';
import LABELS from './labels';

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

const NPC_ALIGNMENT = {
    FRIENDLY: 'friendly',
    ENEMY: 'enemy',
}
const NPC = {
    MUM: 'mum'
};

const npcs = {
    [NPC.MUM]: {
        object: 'woman_1',
        alignment: NPC_ALIGNMENT.FRIENDLY,
        description: 'vedi tua madre che fa quello che le mamme fanno di solito.'
    }
}

const initialWorldState = {
    objects: {
        0: { 0: { 0: { object: NPC.MUM } } }
    }
};

export {
    map,
    npcs,
    NPC,
    initialWorldState,
    AREA,
    LABELS,
    DIRECTIONS_LABELS,
    ACTIONS_LABELS
};