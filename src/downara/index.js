import { DIRECTIONS } from 'lib/game';

const map = {
    0: {
        id: 0,
        label: 'Madonna di Trapani',
        [DIRECTIONS.NORTH]: 1,
        [DIRECTIONS.SOUTH]: 2,
        [DIRECTIONS.EAST]: 3,
        [DIRECTIONS.WEST]: 4,
    },
    1: {
        id: 1,
        label: 'Porta Nuova',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: 0,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    2: {
        id: 2,
        label: 'Via San Francesco',
        [DIRECTIONS.NORTH]: 0,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    3: {
        id: 3,
        label: 'Contrada Luni',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: 0,
    },
    4: {
        id: 4,
        label: 'La Matrice',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: 0,
        [DIRECTIONS.WEST]: 5,
    },
    5: {
        id: 5,
        label: 'Piazza Matteotti',
        [DIRECTIONS.EAST]: 4,
    }
};

const DIRECTIONS_LABELS = {
    [DIRECTIONS.NORTH]: 'Nord',
    [DIRECTIONS.SOUTH]: 'Sud',
    [DIRECTIONS.EAST]: 'Est',
    [DIRECTIONS.WEST]: 'Ovest',
}

export { map, DIRECTIONS_LABELS };