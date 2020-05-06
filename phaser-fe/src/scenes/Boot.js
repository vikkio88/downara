import Phaser from "phaser";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    const progress = this.add.graphics();

    this.load.on("fileprogress", (file, value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 0.75);
      progress.fillRect(700 - value * 600, 250, value * 600, 100);
    });

    this.load.spritesheet("player", "assets/images/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("clickedTile", "assets/images/direction.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("tuxmon", "assets/maps/tuxmon.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.tilemapTiledJSON("map", "assets/maps/madonna.json");
  }

  create() {
    this.scene.start("Game");
  }
}
