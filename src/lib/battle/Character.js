export const FACING = {
    UP: 'face_up',
    DOWN: 'face_down',
    RIGHT: 'face_right',
    LEFT: 'face_left',
};

const defaultStats = {
    hp: 100,
};

export class Character {
    constructor(id, stats = {}, inventory = null, position = { i: 0, j: 0 }, facing = FACING.RIGHT) {
        this.id = id;
        this.stats = {
            ...defaultStats,
            ...stats
        };
        this.position = position;
        this.facing = facing;

        this.inventory = inventory;
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

    apply({ health = null } = {}) {
        if (health !== null) {
            this.modifyHealth(health);
        }
    }

    getHealthPoints() {
        return this.stats.hp;
    }

    modifyHealth(modifier) {
        this.stats.hp += modifier
    }
}