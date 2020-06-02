import Phaser from "phaser";
import { eventBridge } from "lib";

import { BattleGrid } from "../sprites/battle";

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    init(payload) {
        const { actors = [], map = [], size = { i: 6, j: 6 } } = payload;
        this.actors = actors;
        this.map = map;
        this.rows = size.i;
        this.columns = size.j;
        eventBridge.on('battle:showActionableTiles', payload => {
            console.log('[phaser] actionableTiles', payload);
            const { tiles } = payload;
            this.grid.highlight(tiles);
        });
    }

    create() {
        const marginJ = (window.innerWidth - 600) / 2;
        const marginI = (window.innerHeight - 600) / 2;
        this.grid = new BattleGrid(
            this,
            {
                actors: this.actors,
                map: this.map
            },
            { rows: this.rows, columns: this.columns, tileSize: 100, marginJ, marginI }
        );
        this.grid.create();
    }
}