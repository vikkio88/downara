import Phaser from "phaser";

import Tile from '../sprites/battle/Tile';

const ROWS = 9;
const COLUMNS = 13;
const TILE_SIZE = 100;

const MARGIN = 1;
const INITIAL_MARGIN_I = 0;
const INITIAL_MARGIN_J = 0;

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    create() {
        this.tiles = [];
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                this.tiles.push(
                    new Tile(
                        this,
                        { i, j },
                        {
                            x: INITIAL_MARGIN_J + (MARGIN * (j + 1)) + (j * TILE_SIZE),
                            y: INITIAL_MARGIN_I + (MARGIN * (i + 1)) + (i * TILE_SIZE)
                        }
                    ));
            }
        }
    }
}