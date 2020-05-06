import Phaser from "phaser";

export default class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    //this.setScale();

    this.isMoving = false;
    scene.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNumbers("player"),
      yoyo: true,
      frameRate: 6,
      repeat: -1,
    });
  }

  startMoving() {
    console.log("started");
    if (!this.isMoving) {
      this.moving = true;
      this.play("walk");
    }
  }

  stopMoving() {
    console.log("stopped");
    this.moving = false;
    this.anims.stop();
  }

  update() {
    this.angle += 1;
  }
}
