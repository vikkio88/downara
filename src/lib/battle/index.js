import { randomizer } from 'lib';
import { inventoryGenerator, armourGenerator, weaponGenerator } from "lib/battle/Inventory";
import { AI, statsGenerator } from "lib/battle/Character";

export const FACING = {
    UP: 'face_up',
    DOWN: 'face_down',
    RIGHT: 'face_right',
    LEFT: 'face_left',
};

export const battleHelper = {
    getEnemy(level = 1) {
        return {
            id: 'enemy',
            name: 'A Random Bully',
            type: 'battleEnemy',
            facing: FACING.LEFT,
            ai: AI.SIMPLE,
            stats: statsGenerator({ hp: 50 }),
            inventory: inventoryGenerator(),
            ...randomizer.tile({ j: 5 })
        };
    },
    getPlayer({ name = 'Player One' } = {}) {
        return {
            id: 'human',
            name,
            type: 'battlePlayer',
            facing: FACING.RIGHT,
            stats: statsGenerator({ hp: 50 }),
            inventory: inventoryGenerator({
                weapon: weaponGenerator({ name: 'Spaccaculi', hitDie: 1, effects: [{ health: { modifier: -1, range: '10:20' } }] }),
                armour: armourGenerator({ name: 'robes', maxShield: 10, parry: 15 })
            }),
            ...randomizer.tile({ j: 0 })
        };

    },
    payloadGenerator() {
        return {
            actors: [this.getPlayer(), this.getEnemy(),],
            size: { i: 6, j: 6 }
        };
    }
};