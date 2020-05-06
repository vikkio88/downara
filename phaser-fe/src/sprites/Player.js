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

  moveTo(x, y) {
    if (this.clickedTile) this.clickedTile.destroy();
    if (this.destination) {
      this.destination.destroy();
      this.scene.physics.world.removeCollider(this.destinationCollider);
    }
    this.clickedTile = this.scene.add
      .sprite(x, y, "clickedTile", 0)
      .setScale(0.2)
      .play("pulse");

    this.clickedTile.on("animationcomplete", () =>
      this.clickedTile.destroy()
    );

    if (x < this.x) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    this.destination = this.scene.add.rectangle(x, y, 1, 1);
    this.scene.physics.world.enable(this.destination);
    this.startMoving();
    this.scene.physics.moveToObject(this, this.destination, 100);
    this.destinationCollider = this.scene.physics.add.overlap(
      this,
      this.destination,
      () => {
        this.body.stop();
        this.scene.physics.world.removeCollider(this.destinationCollider);
        this.destination.destroy();
        this.stopMoving();
      },
      null,
      this
    );
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

  update() {
    this.angle += 1;
  }
}
