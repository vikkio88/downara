import { DIRECTIONS } from 'lib/game';
const START_POINTS = {
    [DIRECTIONS.NORTH]: { i: 0, j: 3 },
    [DIRECTIONS.SOUTH]: { i: 5, j: 3 },
    [DIRECTIONS.EAST]: { i: 3, j: 5 },
    [DIRECTIONS.WEST]: { i: 5, j: 19 },
};

export default {
    0: {
        id: 0,
        label: 'Madonna di Trapani',
        1: START_POINTS[DIRECTIONS.NORTH],
        2: START_POINTS[DIRECTIONS.SOUTH],
        3: START_POINTS[DIRECTIONS.WEST],
        4: START_POINTS[DIRECTIONS.EAST],
    },
    1: {
        id: 1,
        label: 'Porta Nuova',
        0: START_POINTS[DIRECTIONS.SOUTH]
    },
    2: {
        id: 2,
        label: 'Via San Francesco',
        0: START_POINTS[DIRECTIONS.NORTH]
    },
    3: {
        id: 3,
        label: 'Contrada Luni',
        0: START_POINTS[DIRECTIONS.WEST]
    },
    4: {
        id: 4,
        label: 'La Matrice',
        0: START_POINTS[DIRECTIONS.WEST],
    },
    5: {
        id: 5,
        label: 'Piazza Matteotti',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: 13,
        [DIRECTIONS.EAST]: 4,
        [DIRECTIONS.WEST]: 16,
    },

    6: {
        id: 6,
        label: 'Il Commerciale',
        [DIRECTIONS.NORTH]: 2,
        [DIRECTIONS.SOUTH]: 7,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    7: {
        id: 7,
        label: 'San Giuseppe',
        [DIRECTIONS.NORTH]: 6,
        [DIRECTIONS.SOUTH]: 8,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    8: {
        id: 8,
        label: `L'Itria`,
        [DIRECTIONS.NORTH]: 7,
        [DIRECTIONS.SOUTH]: 9,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    9: {
        id: 9,
        label: 'Il Cannitello',
        [DIRECTIONS.NORTH]: 8,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: 10,
        [DIRECTIONS.WEST]: null,
    },
    10: {
        id: 10,
        label: 'Via Cannitello',
        [DIRECTIONS.NORTH]: 11,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    11: {
        id: 11,
        label: 'Via Dante',
        [DIRECTIONS.NORTH]: 12,
        [DIRECTIONS.SOUTH]: 10,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    12: {
        id: 12,
        label: 'Piazza Loi',
        [DIRECTIONS.NORTH]: 13,
        [DIRECTIONS.SOUTH]: 11,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    13: {
        id: 13,
        label: 'Via Libertà',
        [DIRECTIONS.NORTH]: 5,
        [DIRECTIONS.SOUTH]: 12,
        [DIRECTIONS.EAST]: 14,
        [DIRECTIONS.WEST]: 2,
    },
    14: {
        id: 14,
        label: 'Corso Umberto',
        [DIRECTIONS.NORTH]: 5,
        [DIRECTIONS.SOUTH]: 12,
        [DIRECTIONS.EAST]: 15,
        [DIRECTIONS.WEST]: 13,
    },
    15: {
        id: 15,
        label: 'Quadrivio',
        [DIRECTIONS.NORTH]: 16,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: 14,
    },
    16: {
        id: 16,
        label: 'La Cruci',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: 15,
        [DIRECTIONS.EAST]: 5,
        [DIRECTIONS.WEST]: 17,
    },

    17: {
        id: 17,
        label: 'Il Cimitero',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: 16,
        [DIRECTIONS.WEST]: 18,
    },
    18: {
        id: 18,
        label: 'Il Nostro Posto',
        [DIRECTIONS.NORTH]: 19,
        [DIRECTIONS.SOUTH]: 15,
        [DIRECTIONS.EAST]: 17,
        [DIRECTIONS.WEST]: null,
    },
    19: {
        id: 19,
        label: 'Gulfa',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: 18,
        [DIRECTIONS.EAST]: 1,
        [DIRECTIONS.WEST]: null,
    },
    20: {
        id: 2,
        label: 'Via San Francesco',
        [DIRECTIONS.NORTH]: 0,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    }
};