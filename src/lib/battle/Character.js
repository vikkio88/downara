import SimpleAi from './deciders/SimpleAi';
import RandomAi from './deciders/RandomAi';
import RoamerAi from './deciders/RoamerAi';
export const FACING = {
    UP: 'face_up',
    DOWN: 'face_down',
    RIGHT: 'face_right',
    LEFT: 'face_left',
};

const STATS = {
    HP: 'hp',
    ENDURANCE: 'endurance',
};

export const AI = {
    SIMPLE: 'simple',
    RANDOM: 'random',
    ROAMER: 'roamer',
};

const defaultStats = {
    [STATS.HP]: 100,
    [STATS.ENDURANCE]: 100,
    max: {
        [STATS.HP]: 100,
        [STATS.ENDURANCE]: 100,
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
    [ACTIONS.MOVE]: { endurance: -40 },
    [ACTIONS.WAIT]: { endurance: 20 },
    [ACTIONS.ATTACK]: { endurance: -20 },
    // maybe I can simulate damage reduction with a +10 health on parry
    [ACTIONS.PARRY]: { endurance: 10, health: 10 },
    [ACTIONS.SPELL]: { endurance: 20 },
    [ACTIONS.USE_OBJECT]: { endurance: 0 },
};

export class Character {
    constructor(
        id, config = {}, inventory = null,
        position = { i: 0, j: 0 }, facing = FACING.RIGHT
    ) {
        this.id = id;
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

        this.inventory = inventory;
    }

    initAi() {
        if (this.config.ai !== false) {
            const { config } = this.config.ai;
            const LogicClass = AI_DECIDER[config.logic] || AI_DECIDER.default;
            const traits = config.traits || {};
            this.decider = new LogicClass(traits);
        }
    }

    perform({ type, payload = {} }, battle) {
        console.log(`${this.id} performing: ${type} payload:`, payload);
        // this makes the user pay endurance
        this.apply(ACTIONS_CONFIG[type]);

        const { position = this.getPosition() } = payload;

        if (type === ACTIONS.ATTACK) {
            const targetObject = battle.field.getObject(position);
            if (targetObject === null) return false;

            this.weapon.use(this, targetObject);
        }

        if (type === ACTIONS.MOVE) {
            const targetObject = battle.field.getObject(position);
            if (targetObject === null) {
                // this should be using Field
                this.setPosition(position);
                return { position };
            }

            return false;
        }

        // I will implement a SHIELD UP buff here
        if (type === ACTIONS.PARRY) {
            //this.apply();
        }

    }

    getStats() {
        const { hp, endurance } = this.config;
        return {
            hp,
            endurance,
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

    apply({ health = null, endurance = null } = {}) {
        if (health !== null) {
            this.modifyStat(STATS.HP, health);
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
            facing: this.facing
        };
    }

    static fromActor(actor) {
        const { id, inventory = null, i, j, facing } = actor;
        let { ai = false } = actor;
        if (ai) ai = getAiConfig(ai);
        // here  I will need to load the inventory from a js maybe
        return new Character(id, { ai }, inventory, { i, j }, facing);
    }
}

