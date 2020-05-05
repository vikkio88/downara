import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    this.setScale(1.5);
  }

  update() {
    this.angle += 1;
  }
}
