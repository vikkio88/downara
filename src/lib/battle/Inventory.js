import { Fists, EQUIPMENT_TYPES, Equipment, Armour } from './Equipment';

//EFFECTS { health: { modifier: -1, range: '1:3' } },
export const armourGenerator = ({
    name,
    maxShield = 0,
    parry = 5,
    speedDamage = 0
} = {}) => {
    return new Armour(name, { maxShield, parry, speedDamage });
};

//EFFECTS { health: { modifier: -1, range: '1:3' } },
export const weaponGenerator = ({
    name, type = EQUIPMENT_TYPES.MELEE, effects,
    hitDie = 10,
    reach = 1,
    endurance = 0
} = {}) => {
    return new Equipment(name, type, effects, { hitDie, reach, endurance });
};

// here I will need to create some weapon
export const inventoryGenerator = ({ weapon = null, armour = null } = {}) => {
    return new Inventory(armour, weapon);
};

export class Inventory {
    constructor(armour = null, weapon = null, spells = null, items = []) {
        this.armour = armour !== null ? armour : new Armour();
        this.weapon = weapon !== null ? weapon : new Fists;

        this.spells = spells;
        this.items = items;
    }

    getWeapon() {
        return this.weapon;
    }

    getArmour() {
        return this.armour;
    }
}