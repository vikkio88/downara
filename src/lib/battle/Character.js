import SimpleAi from './deciders/SimpleAi';
import RandomAi from './deciders/RandomAi';
import RoamerAi from './deciders/RoamerAi';
import { OBJECTS } from './Field';

export const FACING = {
    UP: 'face_up',
    DOWN: 'face_down',
    RIGHT: 'face_right',
    LEFT: 'face_left',
};

export const STATS = {
    HP: 'hp',
    ENDURANCE: 'endurance',
    SHIELD: 'shield',
};

export const AI = {
    SIMPLE: 'simple',
    RANDOM: 'random',
    ROAMER: 'roamer',
};

const defaultStats = {
    [STATS.HP]: 100,
    [STATS.ENDURANCE]: 100,
    [STATS.SHIELD]: 0,
    max: {
        [STATS.HP]: 100,
        [STATS.ENDURANCE]: 100,
        [STATS.SHIELD]: 10,
    },
    ai: {
        config: {
            logic: [AI.SIMPLE],
            traits: {
                defensiveness: 0
            }
        }
    },
    speed: 1,
};




export const statsGenerator = ({
    hp = 100, endurance = 100, shield = 0, speed = 1,
    max: { maxH = null, maxE = null, maxS = 10 } = {},
} = {}) => {
    return {
        [STATS.HP]: hp,
        [STATS.ENDURANCE]: endurance,
        [STATS.SHIELD]: shield,
        max: {
            [STATS.HP]: maxH || hp,
            [STATS.ENDURANCE]: maxE || endurance,
            [STATS.SHIELD]: maxS || shield,
        },
        speed: speed
    };
};


const AI_DECIDER = {
    [AI.SIMPLE]: SimpleAi,
    [AI.RANDOM]: RandomAi,
    [AI.ROAMER]: RoamerAi,
    default: SimpleAi
};

export const getAiConfig = type => ({ config: { logic: type } });



export const ACTIONS = {
    MOVE: 'move',
    WAIT: 'wait',
    ATTACK: 'attack',
    PARRY: 'parry',
    SPELL: 'spell',
    USE_OBJECT: 'use_object'
};

const ACTIONS_CONFIG = {
    // if player moves shield drops
    [ACTIONS.MOVE]: { endurance: -20, shield: -10 },
    [ACTIONS.WAIT]: { endurance: 20 },
    // if player attacks shield drops
    [ACTIONS.ATTACK]: { endurance: -20, shield: -5 },
    [ACTIONS.PARRY]: { endurance: 25 },
    [ACTIONS.SPELL]: { endurance: 20 },
    [ACTIONS.USE_OBJECT]: { endurance: 0 },
};

export class Character {
    constructor(
        id, config = {}, inventory = null,
        position = { i: 0, j: 0 }, facing = FACING.RIGHT
    ) {
        this.id = id;

        // here we are not checking whether the stat is exceeding the max
        // maybe is a good thing?
        this.config = {
            ...defaultStats,
            ...config,
            max: {
                ...defaultStats.max,
                ...config.max || {}
            }

        };

        this.initAi();
        this.position = position;
        this.facing = facing;

        // here I probably need to do something 
        // about shield/armour and STAT.SHIELD
        this.inventory = inventory;
        this.applyInventoryEffects();
    }

    initAi() {
        if (this.config.ai !== false) {
            const { config } = this.config.ai;
            const LogicClass = AI_DECIDER[config.logic] || AI_DECIDER.default;
            const traits = config.traits || {};
            this.decider = new LogicClass(traits);
        }
    }

    applyInventoryEffects() {
        const armour = this.inventory ? this.inventory.getArmour() : null;
        if (!armour) return;
        this.config.max.shield += armour.getMaxShieldModifier();
        this.config.speed += armour.getSpeedModifier();
    }

    getWeapon() {
        return this.inventory.getWeapon();
    }

    getArmour() {
        return this.inventory.getArmour();
    }


    perform({ type, payload = {} }, battle) {
        // this makes the user pay endurance
        this.apply(ACTIONS_CONFIG[type]);

        const { position = this.getPosition() } = payload;

        if (type === ACTIONS.ATTACK) {
            let targetObject = battle.field.getObject(position);
            if (targetObject === null || targetObject.type != OBJECTS.CHARACTER) return false;
            targetObject = battle.getCharacter(targetObject.id);
            return this.getWeapon().use(this, targetObject);
        }

        if (type === ACTIONS.MOVE) {
            const targetObject = battle.field.getObject(position);
            if (targetObject === null) {
                // this should be using Field
                battle.field.moveObject(this.getPosition(), position);
                this.setPosition(position);
                return { position };
            }

            return false;
        }

        if (type === ACTIONS.PARRY) {
            this.apply({ shield: this.getArmour().getParry() });
            return true;
        }

        return false;
    }

    getStats() {
        const { hp, endurance, shield } = this.config;
        return {
            hp,
            endurance,
            shield
        };
    }

    getMaxValues() {
        const { max } = this.config;
        return {
            ...max
        };
    }

    getSpeed() {
        return this.config.speed || 0;
    }

    isAi() {
        return this.config.ai !== false;
    }

    setPosition(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }

    setFacing(newFacing) {
        if (!Object.values(FACING).includes(newFacing)) {
            return;
        }

        this.facing = newFacing;
    }

    getFacing() {
        return this.facing;
    }

    apply({ health = null, endurance = null, shield = null } = {}) {
        if (shield !== null) {
            this.modifyStat(STATS.SHIELD, shield);
        }

        if (health !== null) {
            let damage = health;
            const currentShield = this.getShield();
            if (damage < 0 && currentShield > 0) {
                this.modifyStat(STATS.SHIELD, damage);
                damage = damage + currentShield;
                // preventing healing shield
                damage = damage < 0 ? damage : 0;
            }
            this.modifyStat(STATS.HP, damage);
        }

        if (endurance !== null) {
            const currentEndurance = this.getEndurance();
            const remainingCost = currentEndurance + endurance;
            if (remainingCost < 0) this.modifyStat(STATS.HP, remainingCost);
            this.modifyStat(STATS.ENDURANCE, endurance);
        }

    }

    getHealthPoints() {
        return this.config.hp;
    }

    getEndurance() {
        return this.config.endurance;
    }

    getShield() {
        return this.config.shield;
    }

    modifyStat(stat, modifier) {
        const maxValue = this.getMaxValues()[stat];
        const initialValue = this.config[stat];
        let newValue = (initialValue + modifier);
        newValue = newValue < 0 ? 0 : newValue;
        newValue = newValue > maxValue ? maxValue : newValue;

        this.config[stat] = newValue;
    }

    decideAction(battle) {
        return this.decider.decide(this, battle);
    }

    toJs() {
        return {
            id: this.id,
            position: this.getPosition(),
            stats: this.getStats(),
            speed: this.getSpeed(),
            facing: this.facing,
            ai: this.isAi()
        };
    }

    static fromActor(actor) {
        const { id, inventory = null, i, j, stats, facing } = actor;
        let { ai = false } = actor;
        if (ai) ai = getAiConfig(ai);
        // here  I will need to load the inventory from a js maybe
        return new Character(id, { ...stats, ai: ai }, inventory, { i, j }, facing);
    }
}

