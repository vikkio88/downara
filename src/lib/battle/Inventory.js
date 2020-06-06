import { Fists } from './Equipment';

// here I will need to create some weapon
export const inventoryGenerator = ({ weapon = null } = {}) => {
    return new Inventory(null, weapon);
};

export class Inventory {
    constructor(armor = null, weapon = null, spells = null, items = []) {
        this.armor = armor;
        this.weapon = weapon !== null ? weapon : new Fists;

        this.spells = spells;
        this.items = items;
    }

    getWeapon() {
        return this.weapon;
    }
}