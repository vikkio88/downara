const { randomizer } = require('./libs');
const { PROPS, PROPS_CONFIG } = require('./objects');
const NPC_PREFIX = 'npc_';
const NPC = {
    WOMAN: 'woman',
    MAN: 'man',
    FARMER_MAN: 'farmer',
    FARMER_WOMAN: 'farmerw',
};
const NPC_COUNT = 5;

const TERRAINS = {
    GRASS: 'g',
    SAND: 's',
    STREET: 'st',
    DIRT: 'd',
};
const TERRAINS_CONFIG = {
    [TERRAINS.GRASS]: {
        name: 'grass_',
        range: 4
    },
    [TERRAINS.SAND]: {
        name: 'sand_',
        range: 1
    },
    [TERRAINS.STREET]: {
        name: 'street_',
        range: 1
    },
    [TERRAINS.DIRT]: {
        name: 'dirt_',
        range: 1
    },
};

const TILE_PROPERTY = {
    BLOCKED: 'b',
    LINK: 'l'
};
const TILE_PROPERTY_CONFIG = {
    [TILE_PROPERTY.BLOCKED]: (value = true) => ({ blocked: value }),
    [TILE_PROPERTY.LINK]: value => ({ link: value }),
}

const generator = {
    getNPC(forced = false) {
        let asset = forced;
        if (!forced) {
            asset = randomizer.pickOne(Object.values(NPC));
        }
        const number = randomizer.int(0, NPC_COUNT);

        return `${NPC_PREFIX}${asset}${number === 0 ? '' : number}`;
    },
    getTerrain(label) {
        if (!Object.values(TERRAINS).includes(label)) {
            throw Error(`${label} is not a valid terrain`);
        }
        const config = TERRAINS_CONFIG[label];
        return {
            terrain: `${config.name}${randomizer.int(1, config.range)}`
        };
    },
    getProp(label) {
        if (!label) {
            return { object: null };
        }

        if (!Object.values(PROPS).includes(label)
            && !Object.keys(PROPS_CONFIG).includes(label)) {
            throw Error(`${label} is not a valid prop`);
        }
        const props = PROPS_CONFIG[label];

        return {
            object: randomizer.pickOne(props)
        }
    },
    getTileProperty(label, value = null) {
        if (!label) {
            return {};
        }

        if (!Object.values(TILE_PROPERTY).includes(label)) {
            throw Error(`${label} is not a valid tile property`);
        }

        const propGenerator = TILE_PROPERTY_CONFIG[label];
        return propGenerator(value);
    },
    mapFromJson(mapObject) {
        // here some validation on dimension

        const mapResult = {};
        for (const i in mapObject) {
            const row = mapObject[i];
            mapResult[i] = {};
            for (const j in row) {
                const [terrain, object, property, propertyValue = null] = row[j];
                mapResult[i][j] = {
                    ...this.getTerrain(terrain),
                    ...this.getProp(object),
                    ...this.getTileProperty(property, propertyValue),
                };
            }
        }

        return mapResult;
    }

};

module.exports = {
    generator
};

