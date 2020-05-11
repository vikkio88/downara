import Phaser from "phaser";
const SIZE = 100;
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
    constructor(scene, { i, j }, { x, y }) {
        super(
            scene, x, y,
            SIZE, SIZE,
            TILES[Object.keys(TILES)[Math.floor(Math.random() * Object.keys(TILES).length)]]
        );
        this.gridIndexes = { i, j };
        this.setOrigin(0, 0);
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', () => {
            this.setAlpha(.5);
            console.log(this.gridIndexes);
            const center = this.getCenter();
            this.text = this.scene.add.text(center.x, center.y, `${i}, ${j}`);
        });
        this.on('pointerup', () => {
            this.text && this.text.destroy();
            this.setAlpha(1);
        });
    }
}