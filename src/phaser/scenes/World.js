import Phaser from "phaser";
import { eventBridge } from 'lib';

import { Player, Grid } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "World" });

    eventBridge.on('game:worldInit', payload => {
      console.log('[phaser] world init', payload);
      const { worldState, gameState } = payload;
      const { player, worldPosition } = gameState;
      const { flags } = worldState;

      this.area = worldPosition;
      this.playerInitialPosition = player.areaPosition;

      this.flags = flags[this.area] || {};
    });
    eventBridge.emit('phaser:ready');
  }

  create() {
    this.createGrid();
    this.createPlayer();
  }

  createPlayer() {
    const initialTile = this.grid.getTile(this.playerInitialPosition || { i: 0, j: 0 });
    const { x, y } = initialTile.getCenter();
    this.player = new Player(this, x, y);
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.widthInPixels, this.heightInPixels);
  }

  createGrid() {
    const map = this.cache.json.get('area_1');
    const objects = {
      2: {
        3: { object: 'woman' }
      }
    };

    console.log('creating Grid', this.flags);
    this.grid = new Grid(this, map, objects, this.flags, { rows: 20, columns: 20 });
    this.grid.create();
  };

  update() { }
}
