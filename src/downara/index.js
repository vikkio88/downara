import { ACTIONS } from 'lib/game';
import LABELS from './labels';

import { initialGameState } from './initialState';

const ACTIONS_LABELS = {
    [ACTIONS.EXAMINE]: 'Esamina',
    [ACTIONS.INTERACT]: 'Interagisci',
    [ACTIONS.MOVE]: 'Spostati',
};


export {
    initialGameState,
    ACTIONS_LABELS,
    LABELS
};