import Phaser from "phaser";
import { Player } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });

    this.tiles = this.map.addTilesetImage("tuxmon");
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer("blocked", this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);
    this.map.createStaticLayer("under", this.tiles, 0, 0);

    this.player = new Player(this, 0, 0);
    this.map.createStaticLayer("over", this.tiles, 0, 0);
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
      frameRate: 6,
      repeat: 0,
    });


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
    });
  }

  update() {
  }

  playerFog() { }
}
