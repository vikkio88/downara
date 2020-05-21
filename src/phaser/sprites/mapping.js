export const NAMES = {
    // Characters
    WOMAN: 'woman',
    MAN: 'man',
    FARMER: 'farmer',
    FARMER_W: 'farmer_w',

    // Buildings
    HOUSE: 'house',
    MANSION: 'mansion',
    TOWER: 'tower',
    SETTLEMENT: 'settlement',
    WALLS: 'wall',
    CASTLE: 'castle',

    // Nature
    TREE: 'trees',
    MOUNTAINS: 'mountains',
    POND: 'pond',
    HILLS: 'hills',

    // Items
    FLAG: 'flag',
    BOX: 'box',
    ROAD_SIGN: 'road_sign',
};


export const FRAMES = {
    [NAMES.WOMAN]: [250, 246, 253, 258, 260],
    [NAMES.MAN]: [7, 8, 14, 15],
    [NAMES.FARMER]: [7, 8, 14, 15],
    [NAMES.FARMER_W]: [7, 8, 14, 15],

    [NAMES.HOUSE]: [7, 8, 14, 15],
    [NAMES.MANSION]: [9, 16, 17],
    [NAMES.TOWER]: [22, 23, 24, 25, 26],
    [NAMES.SETTLEMENT]: [42, 43],
    [NAMES.WALLS]: [29, 30, 31, 32, 33],
    [NAMES.ROAD_SIGN]: [],
    [NAMES.CASTLE]: [],

    [NAMES.TREE]: [4, 5, 6],
    [NAMES.MOUNTAINS]: [10, 11, 12],
    [NAMES.POND]: [19],
    [NAMES.HILLS]: [13, 27],

    [NAMES.FLAG]: [],
    [NAMES.BOX]: [],
    [NAMES.ROAD_SIGN]: [237],
};

export const OBJECT_CONFIG = {
    [NAMES.WOMAN]: {
        offset: { x: 20, y: 0 },
        scale: 2
    },
    [NAMES.ROAD_SIGN]:{
        scale: 2
    },
    default: {
        offset: { x: 0, y: 0 },
        scale: 3.5
    }
};