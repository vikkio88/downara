import Phaser from "phaser";
const SIZE = 100;
const COLOURS = [
    0xff0000,
    0x00ff00,
    0x0000ff,
];
export default class extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            SIZE, SIZE,
            COLOURS[Math.floor(Math.random() * COLOURS.length)]
        );
        this.setOrigin(0, 0);
        scene.add.existing(this);
    }
}