import Phaser from "phaser";


export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    create() {
        this.tiles = [];
        
    }
}