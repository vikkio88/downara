import Phaser from "phaser";

export default class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    scene.add.existing(this);
    //this.setScale(.5);

    this.isMoving = false;
    scene.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNumbers("player"),
      yoyo: true,
      frameRate: 6,
      repeat: -1,
    });
  }

  moveTo(worldX, worldY) {
    if (worldX < this.x) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    this.scene.tweens.add({
      targets: this,
      x: worldX,
      y: worldY,
      duration: 1000,
      ease: 'circular.easeInOut',
      onStart: () => this.startMoving(),
      onComplete: () => {
        this.stopMoving();
        window.eventBridge.emit('phaser:enteredTile', { i: 0, j: 0 });
      },
      loop: false,
    });
  }

  startMoving() {
    if (!this.isMoving) {
      this.moving = true;
      this.play("walk");
    }
  }

  stopMoving() {
    this.moving = false;
    this.anims.stop();
  }
}
