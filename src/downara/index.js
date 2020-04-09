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
};

export {
    map,
    LABELS,
    DIRECTIONS_LABELS,
    ACTIONS_LABELS
};