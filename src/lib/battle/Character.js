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

const defaultStats = {
    [STATS.HP]: 100,
    [STATS.ENDURANCE]: 100,
    ai: true,
    speed: 1,
};

const ACTIONS = {
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
        id, stats = {}, inventory = null,
        position = { i: 0, j: 0 }, facing = FACING.RIGHT
    ) {
        this.id = id;
        this.stats = {
            ...defaultStats,
            ...stats
        };
        this.position = position;
        this.facing = facing;

        this.inventory = inventory;
    }

    action(type, payload) {
        // this makes the user pay endurance
        this.apply(ACTIONS_CONFIG[type]);

        if (type === ACTIONS.ATTACK) {
            this.weapon.use(this, payload);
        }

    }

    getStats() {
        const { hp, endurance } = this.stats;
        return {
            hp,
            endurance,
        };
    }

    getSpeed() {
        return this.stats.speed || 0;
    }

    isAi() {
        return this.stats.ai;
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
            this.modifyStat(STATS.endurance, endurance)
        }

    }

    getHealthPoints() {
        return this.stats.hp;
    }

    modifyStat(stat, modifier) {
        const initialValue = this.stats[stat];
        const newValue = (initialValue + modifier);
        this.stats[stat] = newValue < 0 ? 0 : newValue;
    }
}