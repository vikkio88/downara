import Phaser from "phaser";

import { BattleGrid } from "../sprites";

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    create() {
        const marginJ = (window.innerWidth - 600) / 2;
        const marginI = (window.innerHeight - 600) / 2;
        // Actors
        // addActor({ id, type, i, j }) {
        const actors = [
            {
                id: 'player',
                type: 'battlePlayer',
                i: 0, j: 1
            },
            {
                id: 'enemy',
                type: 'battleEnemy',
                i: 2, j: 3
            },

        ];
        this.grid = new BattleGrid(
            this,
            {
                actors
            },
            { rows: 6, columns: 6, tileSize: 100, marginJ, marginI }
        );
        this.grid.create();
    }
}