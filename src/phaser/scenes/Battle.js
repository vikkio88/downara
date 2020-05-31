import Phaser from "phaser";

import { Grid } from "../sprites";

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    create() {
        this.grid = new Grid(
            this,
            {},
            { rows: 6, columns: 7, tileSize: 150 }
        );
        this.grid.create();
    }
}