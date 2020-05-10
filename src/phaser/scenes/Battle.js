import Phaser from "phaser";

import Tile from '../sprites/battle/Tile';

const GRID_SIZE = 8;
const TILE_SIZE = 100;

const MARGIN = 10;
const INITIAL_MARGIN_I = 0;
const INITIAL_MARGIN_J = 0;

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    create() {
        this.tiles = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                this.tiles.push(
                    new Tile(
                        this,
                        INITIAL_MARGIN_J + (MARGIN * (j + 1)) + (j * TILE_SIZE),
                        INITIAL_MARGIN_I + (MARGIN * (i + 1)) + (i * TILE_SIZE)
                    ));
            }
        }
    }
}