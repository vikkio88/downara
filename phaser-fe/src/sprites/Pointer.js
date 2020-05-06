import Phaser from "phaser";
const ACTIVE_COLOUR = 0x00ff00;
const DISABLED_COLOUR = 0xff0000;
const DEFAULT_SIZE = 32;
export default class extends Phaser.GameObjects.Rectangle {
  constructor(scene) {
    super(scene, 0, 0, DEFAULT_SIZE, DEFAULT_SIZE, ACTIVE_COLOUR);
    this.scene.add.existing(this);

    this.thickness = 2;
    this.color = ACTIVE_COLOUR;
    this.setStrokeStyle(this.thickness, this.color, 1);
  }
  update({ x, y }) {
    if (this.scene.input.activePointer.isDown) {
      console.log(this.x, this.y);
    }

    //this.strokeColor = ACTIVE_COLOUR;
    const { worldX, worldY } = this.scene.input.activePointer;
    if (Phaser.Math.Distance.Between(worldX, worldY, x, y) > 200) {
      //this.strokeColor = DISABLED_COLOUR;
    }
    this.setPosition(worldX - this.size / 2, worldY - this.size / 2);
  }
}
