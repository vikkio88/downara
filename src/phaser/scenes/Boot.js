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

    this.load.spritesheet("player", "assets/objects/main/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("terrain", "assets/tiles/tilesExtruded.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    
    this.load.spritesheet("tiles", "assets/tiles/tiles.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.tilemapTiledJSON("map", 'assets/maps/test1.json');
  }

  create() {
    this.scene.start("Game");
  }
}
