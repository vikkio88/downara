import Phaser from "phaser";
import { eventBridge } from 'lib';

import { TestPlayer, Grid } from "../sprites";

const INITIAL_ZOOM = 5;
const NORMAL_ZOOM = 1;
const ZOOM_DURATION = 500;

export default class extends Phaser.Scene {

  constructor() {
    super({ key: "TestMap" });
    eventBridge.emit('phaser:ready');

    this.area = 0;
    this.objects = {};
    this.flags = {};
  }

  create() {
    this.createGrid();
    this.createPlayer();
    this.setUpCamera();
  }

  createPlayer() {
    const initialTile = this.grid.getTile({ i: 10, j: 10 });
    const { x, y } = initialTile.getCenter();
    this.player = new TestPlayer(this, x, y);
  }

  createGrid() {
    const map = this.cache.json.get(`area_${this.area}`);
    this.grid = new Grid(
      this,
      { map, objects: this.objects, flags: this.flags },
      { rows: 20, columns: 20 }
    );
    this.grid.create();
  }

  setUpCamera() {
    this.input.enabled = false;
    this.mainCamera = this.cameras.main;
    this.mainCamera.startFollow(this.player);
    this.mainCamera.setBounds(0, 0, this.widthInPixels, this.heightInPixels);
    this.mainCamera.zoom = INITIAL_ZOOM;
    this.mainCamera.zoomTo(NORMAL_ZOOM, ZOOM_DURATION, Phaser.Math.Easing.Sine.InOut);
    this.mainCamera.on('camerazoomcomplete', () => {
      this.input.enabled = true;
      this.player.showActionableArea();
    });
  }
}
