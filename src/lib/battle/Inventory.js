import { Fists } from './Equipment';

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