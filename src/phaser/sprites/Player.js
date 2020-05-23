import Phaser from "phaser";

import LABELS from 'downara/labels';

import { eventBridge } from 'lib';

export default class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    scene.add.existing(this);
    //this.setScale(.5);


    this.tile = { i: 0, j: 0 };
    this.speed = 150;
    this.actionableDistance = 300;

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
    if (this.isInTile({ i, j })) {
      this.showActionableArea();
      return;
    }

    const distance = Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x, y });
    if (distance > this.actionableDistance) {
      this.showActionableArea();
      eventBridge.emitFromPhaser('error', LABELS.TOO_FAR);
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
      onComplete: () => this.stopMoving({ i, j }),
      loop: false,
    });
  }

  showActionableArea() {
    this.circle = this.scene.add.circle(
      this.x,
      this.y,
      this.actionableDistance - 50,
      0xffffff,
      0.3
    );

    this.scene.time.addEvent({
      delay: 1000,
      callback: () => this.circle.destroy(),
      loop: false,
    });
  }

  startMoving() {
    this.isMoving = true;
    this.play("walk");
    eventBridge.emitFromPhaser('clearMessage');
  }

  stopMoving({ i, j }) {
    this.isMoving = false;
    this.anims.stop();
    this.tile = { i, j };
    this.flipX = false;
    eventBridge.emitFromPhaser('movedToTile', { i, j });
  }

  isInTile({ i, j }) {
    return i === this.tile.i && j === this.tile.j;
  }
}
