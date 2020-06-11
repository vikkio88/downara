import Phaser from "phaser";
import { eventBridge } from 'lib';


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

    this.load.image('grass', 'assets/tiles/grass_1.png');
    this.load.image('sand', 'assets/tiles/sand_1.png');
    this.load.image('street', 'assets/tiles/street_1.png');
    this.load.image('dirt', 'assets/tiles/dirt_1.png');

    this.load.image('battlePlayer', 'assets/battle/man_up.png');
    this.load.image('battleEnemy', 'assets/battle/man_up2.png');

    /*
    this.load.spritesheet('player', "assets/objects/main/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    */

    this.load.spritesheet('mapTiles', "assets/tiles/tileset.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    /*
    for (let i = 0; i <= 4; i++) {
      this.load.json(`area_${i}`, `assets/areas/area_${i}.json`);
    }
    */
  }

  create() {
    //this.scene.start("TestMap");
    //this.scene.start("World");
    eventBridge.on('game:battle', payload => {
      console.log('[phaser] trigger battle', payload);
      this.scene.start("Battle", payload);
    });

    eventBridge.emit('phaser:ready');
  }
}
