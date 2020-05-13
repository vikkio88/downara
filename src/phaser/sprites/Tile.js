import Phaser from "phaser";
// const COLOURS = [
//     0xff0000,
//     0x00ff00,
//     0x0fff30,
//     0x0000ff,
//     0xf0f0ff,
// ];

const TILES = {
    GRASS: 'grass',
    //DIRT: 'dirt',
    SAND: 'sand',
    //STREET: 'street',
};
export default class extends Phaser.GameObjects.TileSprite {
    constructor(scene, size, { i, j }, { x, y }, textureKey = null) {
        super(
            scene, x, y,
            size, size,
            textureKey || TILES[Object.keys(TILES)[Math.floor(Math.random() * Object.keys(TILES).length)]]
        );

        this.gridIndexes = { i, j };
        this.setOrigin(0, 0);
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', () => {
            this.setAlpha(.5);
            const { x, y } = this.getCenter();
            this.scene.player.moveTo({ x, y }, this.gridIndexes);
        });
        this.on('pointerup', () => {
            this.setAlpha(1);
        });
    }
}