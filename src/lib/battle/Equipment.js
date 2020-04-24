import { randomizer } from 'lib';
const defaultConfig = {
    chance: 50, // chance of hitting
    reach: 1, // how far it can target
};

export const EQUIPMENT_TYPES = {
    MELEE: 'melee',
    DISTANCE: 'distance',
    MAGIC: 'magic',
    USABLE: 'usable',
}

export class Equipment {
    constructor(name, type, effects, config = {}) {
        this.name = name;
        this.type = type;
        this.effects = effects;
        this.config = {
            ...defaultConfig,
            ...config
        };
    }

    getReach() {
        return this.config.reach;
    }

    getChance() {
        return this.config.chance;
    }

    use(user, object) {
        const chance = this.getChance();
        // here I could use dice instead of chance?
        if (randomizer.chance(chance)) {
            const results = [];
            for (const i in this.effects) {
                const baseEffect = this.effects[i];
                const effect = this.calculateEffect(baseEffect);
                baseEffect.self ? user.apply(effect) :
                    object.apply(effect);

                results.push(effect);
            }
            return results;
        }

        return false;
    }

    // { health: { modifier: -1, range: '1:3' } },
    calculateEffect(effect) {
        const { health = null } = effect;
        const resultEffect = {}
        if (health) {
            const { modifier = 1, range = '1' } = health;
            const [min, max = null] = range.split(':').map(n => parseInt(n));
            const damage = randomizer.int(min, max || min);
            resultEffect.health = modifier * damage;
        }

        return resultEffect;
    }
}