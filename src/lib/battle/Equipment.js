import { randomizer } from 'lib';
const defaultConfig = {
    hitDie: 10, // chance of hitting on a d20
    reach: 1, // how far it can target
    endurance: 0, //how much endurance it will cost to use
};

export const EQUIPMENT_TYPES = {
    MELEE: 'melee',
    DISTANCE: 'distance',
    MAGIC: 'magic',
    USABLE: 'usable',
};

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

    getEnduranceCost() {
        return this.config.endurance || 0;
    }

    didHit(rolledHitDie) {
        const hitThreshold = this.config.hitDie;
        return rolledHitDie >= hitThreshold;
    }

    // both of type Character
    use(user, object) {
        if (!object || object.apply === undefined) {
            return false;
        }
        const endurance = this.getEnduranceCost();
        if (endurance !== 0) user.apply({ endurance });

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
        const resultEffect = {};
        if (health) {
            const { modifier = 1, range = '1' } = health;
            const [min, max = null] = range.split(':').map(n => parseInt(n));
            const damage = randomizer.int(min, max || min);
            resultEffect.health = modifier * damage;
        }

        return resultEffect;
    }

    toJs() {
        return {
            name: this.name,
            effects: this.effects,
            type: this.type,
            endurance: this.getEnduranceCost(),
            reach: this.getReach(),
            hitDie: this.config.hitDie
        };
    }
}

const MIN_PARRY = 5;

export class Armour {
    constructor(name = null, config = {}) {
        this.name = name;
        const { maxShield = 0, parry = MIN_PARRY, speed = 0 } = config;
        this.maxShieldModifier = maxShield;
        this.parry = parry;
        this.speedModifier = speed;
    }

    getMaxShieldModifier(){
        return this.maxShieldModifier || 0
    }

    getParry(){
        return this.parry || MIN_PARRY;
    }

    getSpeedModifier(){
        return this.speedModifier || 0;
    }

    toJs(){
        return {
            name: this.name,
            maxShield: this.getMaxShield(),
            parry: this.parry,
            speedModifier: this.speedModifier
        }
    }
}


export class Fists extends Equipment {
    constructor() {
        super(
            'fists',
            EQUIPMENT_TYPES.MELEE,
            [{ health: { modifier: -1, range: '1:10' } }],
            { hitDie: 5 }
        );
    }
}

export class InfallibleFists extends Equipment {
    constructor() {
        super(
            'infallible Fists',
            EQUIPMENT_TYPES.MELEE,
            [{ health: { modifier: -1, range: '1' } }],
            { hitDie: 0 }
        );
    }
}