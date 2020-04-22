export class Inventory {
    constructor(armor = null, weapon = null, spells = null, items = []) {
        this.armor = armor;
        this.weapon = weapon;
        this.spells = spells;
        this.items = items;
    }
}