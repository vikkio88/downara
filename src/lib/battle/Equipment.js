import { randomizer } from 'lib';
const defaultConfig = {
    hitDie: 10, // chance of hitting on a d20
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

    didHit(rolledHitDie) {
        const hitThreshold = this.config.hitDie;
        return rolledHitDie >= hitThreshold;
    }

    use(user, object) {
        const rolledDie = randomizer.dice(20);
        if (this.didHit(rolledDie)) {
            const self = [];
            const enemy = [];
            for (const i in this.effects) {
                const baseEffect = this.effects[i];
                const effect = this.calculateEffect(baseEffect);
                baseEffect.self ? user.apply(effect) :
                    object.apply(effect);

                baseEffect.self ? self.push(effect) : enemy.push(effect);
            }
            return { die: rolledDie, results: { self, enemy } };
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