import Phaser from "phaser";

import { eventBridge } from 'lib';

export default class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    scene.add.existing(this);
    //this.setScale(.5);


    this.speed = 150;

    this.isMoving = false;
    scene.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNumbers("player"),
      yoyo: true,
      frameRate: 6,
      repeat: -1,
    });
  }

  moveTo({ x, y }, { i, j }) {
    const distance = Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x, y });
    if (distance > 300) {
      console.log('nope');
      return;
    }

    if (x < this.x) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    const dt = distance / this.speed;
    this.scene.tweens.add({
      targets: this,
      x, y,
      duration: dt * 1000,
      ease: 'circular.easeInOut',
      onStart: () => this.startMoving(),
      onComplete: () => {
        this.stopMoving();
        eventBridge.emit('phaser:enteredTile', { i, j });
      },
      loop: false,
    });
  }

  startMoving() {
    this.moving = true;
    if (!this.isMoving) {
      this.play("walk");
    }
  }

  stopMoving() {
    this.moving = false;
    this.anims.stop();
  }
}
