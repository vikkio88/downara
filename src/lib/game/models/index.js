import { DIRECTIONS } from '../';

const map = {
    0: {
        id: 0,
        label: '0',
        [DIRECTIONS.NORTH]: 1,
        [DIRECTIONS.SOUTH]: 2,
        [DIRECTIONS.EAST]: 3,
        [DIRECTIONS.WEST]: 4,
    },
    1: {
        id: 1,
        label: '1',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: 0,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    2: {
        id: 2,
        label: '2',
        [DIRECTIONS.NORTH]: 0,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: null,
    },
    3: {
        id: 3,
        label: '3',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: null,
        [DIRECTIONS.WEST]: 0,
    },
    4: {
        id: 4,
        label: '4',
        [DIRECTIONS.NORTH]: null,
        [DIRECTIONS.SOUTH]: null,
        [DIRECTIONS.EAST]: 0,
        [DIRECTIONS.WEST]: 5,
    },
    5: {
        id: 5,
        label: 'win',
        [DIRECTIONS.EAST]: 4,
    }
};


export { map };