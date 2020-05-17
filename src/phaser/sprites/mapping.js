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
    ROAD_SIGN: 'road_sign',
    CASTLE: 'castle',

    // Nature
    TREE: 'trees',
    MOUNTAINS: 'mountains',
    POND: 'pond',
    HILLS: 'hills',
};


export const FRAMES = {
    [NAMES.TREE]: [4, 5, 6],
    [NAMES.HOUSE]: [7, 8, 14, 15],
    [NAMES.MANSION]: [9, 16, 17],
};

export const OBJECT_CONFIG = {
    default: {
        offset: { x: 0, y: 0 },
        scale: 3
    }
};