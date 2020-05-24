import Phaser from "phaser";
import { eventBridge } from 'lib';

import { Player, Grid } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "World" });

    eventBridge.on('game:areaInit', payload => {
      console.log('[phaser] area init', payload);
      this.areaInit(payload);
    });
    eventBridge.on('game:areaUpdate', payload => {
      console.log('[phaser] area update', payload);
      this.areaUpdate(payload);
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
    const map = this.cache.json.get(`area_${this.area}`);
    this.grid = new Grid(this, map, this.objects, this.flags, { rows: 20, columns: 20 });
    this.grid.create();
  }

  areaInit(payload) {
    const { worldState, gameState } = payload;
    const { player, worldPosition } = gameState;
    this.playerInitialPosition = player.areaPosition;
    this.area = worldPosition;
    const { flags, objects } = worldState;
    this.flags = flags[this.area] || {};
    this.objects = objects[this.area] || {};
  }

  areaUpdate({ objects = {}, flags = {} }) {
    this.grid.updateGrid(objects, flags);
  }

}
