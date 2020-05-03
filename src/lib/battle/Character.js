import SimpleAi from './deciders/SimpleAi';
import RandomAi from './deciders/RandomAi';
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
};

const defaultStats = {
    [STATS.HP]: 100,
    [STATS.ENDURANCE]: 100,
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
    default: SimpleAi
};



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
    [ACTIONS.PARRY]: { endurance: 10 },
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
            ...config
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

    perform({ type, payload }, battle) {
        // this makes the user pay endurance
        this.apply(ACTIONS_CONFIG[type]);

        if (type === ACTIONS.ATTACK) {
            this.weapon.use(this, payload);
        }

    }

    getStats() {
        const { hp, endurance } = this.config;
        return {
            hp,
            endurance,
        };
    }

    getSpeed() {
        return this.config.speed || 0;
    }

    isAi() {
        return this.config.ai !== false;
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
        const initialValue = this.config[stat];
        const newValue = (initialValue + modifier);
        this.config[stat] = newValue < 0 ? 0 : newValue;
    }

    decideAction(battle) {
        return this.decider.decide(this, battle);
    }
}

