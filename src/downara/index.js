import { ACTIONS } from 'lib/game';
import { interactables, NPC, LOCATIONS, OBJECT_DESCRIPTIONS, FLAGS } from './mapObjects';
import map from './map';
import LABELS from './labels';

import { initialGameState, initialWorldState } from './initialState';

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