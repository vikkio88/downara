import Phaser from "phaser";
import { FACING } from "lib/battle";

import { BattleGrid } from "../sprites";

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    create() {
        const marginJ = (window.innerWidth - 600) / 2;
        const marginI = (window.innerHeight - 600) / 2;
        const actors = [
            {
                id: 'player',
                type: 'battlePlayer',
                facing: FACING.RIGHT,
                i: 0, j: 1
            },
            {
                id: 'enemy',
                type: 'battleEnemy',
                facing: FACING.LEFT,
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

        // Testing some movement tweens
        this.time.addEvent({
            delay: 2000,
            callback: () => this.grid.play('enemy', { type: 'move', payload: { i: 1, j: 3 } }),
            loop: false,
        });

        this.time.addEvent({
            delay: 3000,
            callback: () => this.grid.play('player', { type: 'move', payload: { i: 2, j: 1 } }),
            loop: false,
        });
        
    }
}