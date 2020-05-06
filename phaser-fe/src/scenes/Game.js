import Phaser from "phaser";
import { Player } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });

    this.tiles = this.map.addTilesetImage("RPGpack_sheet");
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer("Blocked", this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);

    this.player = new Player(this, 0, 0);
    Phaser.Display.Align.In.Center(
      this.player,
      this.add.zone(400, 300, 800, 600)
    );

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.anims.create({
      key: "pulse",
      frames: this.anims.generateFrameNumbers("clickedTile"),
      yoyo: true,
      frameRate: 4,
      repeat: 1,
    });

    /*
    this is to show a circle around the clickable area
    this.circle = this.add.circle(
      this.player.x,
      this.player.y,
      200,
      0xffffff,
      0.1
    );
    */

    this.physics.add.collider(this.player, this.blockedLayer, () => {
      this.player.stopMoving();
      this.player.body.stop();
      if (this.clickedTile) this.clickedTile.destroy();

      if (this.destination) {
        this.destination.destroy();
        this.physics.world.removeCollider(this.destinationCollider);
      }
    });

    this.input.on("pointerdown", ({ worldX: x, worldY: y }) => {
      this.player.moveTo(x, y);

      /*
      unfortunately tweens does not seem to respect physics
      this.tweens.add({
        targets: this.player,
        x: worldX,
        y: worldY,
        duration: 500,
        ease: "circular.easeInOut",
        onStart: () => this.player.startMoving(),
        onComplete: () => this.player.stopMoving(),
        loop: false,
      });
      */
    });
  }

  update() {
    /*
    updating clickable area position
    this.circle.x = this.player.x;
    this.circle.y = this.player.y;
    */
  }

  playerFog() { }
}
