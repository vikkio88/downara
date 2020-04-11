/*
object = randomizer.chance(50) ? null : randomizer.pickOne(['house_1', 'man_1', 'house_3', 'tree_1', 'mansion_2', 'mountain_2'])
    terrain = randomizer.pickOne(['grass_1', 'sand_1'])
*/
export default {
    0: {
        0: { terrain: 'grass_1', object: null, },
        1: { terrain: 'grass_1', object: null, },
        2: { terrain: 'grass_1', object: null, },
        3: { terrain: 'grass_1', object: null, },
        4: { terrain: 'grass_1', object: null, },
        5: { terrain: 'grass_1', object: 'tree_1', },
    },
    1: {
        0: { terrain: 'grass_1', object: null, },
        1: { terrain: 'grass_1', object: null, },
        2: { terrain: 'grass_1', object: null, },
        3: { terrain: 'grass_1', object: 'tree_1', },
        4: { terrain: 'grass_1', object: 'mansion_2', },
        5: { terrain: 'grass_1', object: null, },
    },
    2: {
        0: { terrain: 'grass_1', object: 'house_1', },
        1: { terrain: 'grass_1', object: 'houses_1', },
        2: { terrain: 'grass_1', object: 'house_3', },
        3: { terrain: 'grass_1', object: 'tree_1', },
        4: { terrain: 'grass_1', object: 'mansion_1', },
        5: { terrain: 'grass_1', object: 'house_1', },
    },
    3: {
        0: { terrain: 'sand_1', object: 'mansion_2', },
        1: { terrain: 'sand_1', object: 'mansion_1', },
        2: { terrain: 'sand_1', object: 'tree_1', },
        3: { terrain: 'sand_1', object: 'houses_3', },
        4: { terrain: 'sand_1', object: null, },
        5: { terrain: 'sand_1', object: 'man_1', },
    },
    4: {
        0: { terrain: 'grass_1', object: null, },
        1: { terrain: 'grass_1', object: 'tree_1', },
        2: { terrain: 'grass_1', object: null, },
        3: { terrain: 'grass_1', object: 'tree_1', },
        4: { terrain: 'grass_1', object: null, },
        5: { terrain: 'grass_1', object: null, },
    },
    5: {
        0: { terrain: 'grass_1', object: null, },
        1: { terrain: 'grass_1', object: null, },
        2: { terrain: 'grass_1', object: 'tree_1', },
        3: { terrain: 'grass_1', object: null, },
        4: { terrain: 'grass_1', object: null, },
        5: { terrain: 'grass_1', object: null, },
    },
};