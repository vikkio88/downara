const PROPS = {
    HOUSE: 'h',
    MANSION: 'm',
    TREE: 't',
    MOUNTAINS: 'mnt',
    POND: 'p',
    HILLS: 'hls',
    TOWERS: 'twr',
    SETTLEMENT: 'stl',
    WALLS: 'w',
    ROAD_SIGN: 's',
};

const PROPS_CONFIG = {
    [PROPS.HOUSE]: ['house', 'house1', 'house2', 'houses', 'houses1', 'houses2'],
    [PROPS.MANSION]: ['mansion', 'mansion1',],
    [PROPS.MOUNTAINS]: ['mountain', 'mountains', 'mountains2'],
    [PROPS.TREE]: ['tree', 'tree2', 'tree3'],
    [PROPS.POND]: ['pond', 'pond1', 'pond2'],
    [PROPS.HILLS]: ['hill', 'hills'],
    [PROPS.TOWERS]: ['tower', 'tower1', 'tower2', 'tower3', 'tower4', 'tower5'],
    [PROPS.SETTLEMENT]: ['settlement', 'settlement1'],
    [PROPS.WALLS]: ['walls', 'walls1', 'walls2', 'walls3', 'walls4'],
}


module.exports = {
    PROPS, PROPS_CONFIG
}