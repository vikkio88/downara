import Phaser from "phaser";
import { Player } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });

    this.terrain = this.map.addTilesetImage("terrain");
    this.tiles = this.map.addTilesetImage("tiles");
    //this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
    this.map.createStaticLayer("street", this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer("houses", this.tiles, 0, 0);

    this.player = new Player(this, 0, 0);
    Phaser.Display.Align.In.Center(
      this.player,
      this.add.zone(400, 300, 800, 600)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.input.on("pointerdown", ({ worldX, worldY }) => {
      if (worldX < this.player.x) {
        this.player.flipX = true;
      } else {
        this.player.flipX = false;
      }

      this.tweens.add({
        targets: this.player,
        x: worldX,
        y: worldY,
        duration: 1000,
        ease: 'circular.easeInOut',
        onStart: () => this.player.startMoving(),
        onComplete: () => {
          this.player.stopMoving();
          const { x: j, y: i } = this.layer.getTileAtWorldXY(this.player.x, this.player.y);
          window.eventBridge.emit('phaser:enteredTile', { i, j });
        },
        loop: false,
      });
    });

  }

  update() { }
}
