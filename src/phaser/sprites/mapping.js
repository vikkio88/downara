import { NAMES } from 'downara/sprites';

export const OBJECT_CONFIG = {
    [NAMES.WOMAN]: {
        offset: { x: 25, y: 0 },
        scale: 2,
        flipX: true
    },
    [NAMES.ROAD_SIGN]: {
        scale: 2
    },
    default: {
        offset: { x: 0, y: 0 },
        scale: 3.5,
        flipX: false
    }
};