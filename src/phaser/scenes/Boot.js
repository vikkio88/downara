import Phaser from "phaser";
import { eventBridge } from 'lib';


export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const loadingText = this.add.text(centerX, centerY, 'Loading...',{
      font: '40px monospace',
      stroke: '#cbd5e0',
      fontStyle: 'strong',
      strokeThickness: 2,
      fill: '#4299e1'
  }).setOrigin(0.5);

    this.load.on('complete', () => {
      loadingText.destroy();
    });

    this.load.image('grass', 'assets/tiles/grass_1.png');
    this.load.image('sand', 'assets/tiles/sand_1.png');
    this.load.image('street', 'assets/tiles/street_1.png');
    this.load.image('dirt', 'assets/tiles/dirt_1.png');

    this.load.image('battlePlayer', 'assets/battle/man_up.png');
    this.load.image('battleEnemy', 'assets/battle/man_up2.png');

    this.load.spritesheet('mapTiles', "assets/tiles/tileset.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    eventBridge.on('game:battle', payload => {
      console.log('[phaser] trigger battle', payload);
      this.scene.start("Battle", payload);
    });

    eventBridge.emit('phaser:ready');
  }
}
