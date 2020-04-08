import { DIRECTIONS, ACTIONS } from 'lib/game';
import map from './map';

const DIRECTIONS_LABELS = {
    [DIRECTIONS.NORTH]: 'Nord',
    [DIRECTIONS.SOUTH]: 'Sud',
    [DIRECTIONS.EAST]: 'Est',
    [DIRECTIONS.WEST]: 'Ovest',
};

const ACTIONS_LABELS = {
    [ACTIONS.EXAMINE]: 'Esamina',
    [ACTIONS.INTERACT]: 'Interagisci',
};

export { map, DIRECTIONS_LABELS, ACTIONS_LABELS };