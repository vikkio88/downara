import { Fists } from "./Equipment";

export class Inventory {
    constructor(armor = null, weapons = [], spells = null, items = []) {
        this.armor = armor;
        if (weapons.length === 0) {
            weapons = [
                new Fists
            ];
        }
        this.weapons = weapons;
        this.spells = spells;
        this.items = items;
    }
}