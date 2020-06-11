import Phaser from "phaser";
import { eventBridge } from 'lib';

import { Player, WorldGrid } from "../sprites";

const INITIAL_ZOOM = 5;
const NORMAL_ZOOM = 1;
const ZOOM_DURATION = 2000;

export default class extends Phaser.Scene {

  constructor() {
    super({ key: "World" });

    eventBridge.on('game:areaInit', payload => {
      console.log('[phaser] area init', payload);
      this.areaInit(payload);
    });
    eventBridge.on('game:areaChange', payload => {
      console.log('[phaser] area change', payload);
      this.areaInit(payload);
      this.player.destroy();
      this.grid.destroy();
      this.create();
    });
    eventBridge.on('game:areaUpdate', payload => {
      console.log('[phaser] area update', payload);
      this.areaUpdate(payload);
    });

    eventBridge.on('game:battle', payload => {
      console.log('[phaser] trigger battle', payload);
      this.scene.start("Battle", payload);
    });

    eventBridge.emit('phaser:ready');
  }

  create() {
    this.createGrid();
    this.createPlayer();
    this.setUpCamera();
  }

  createPlayer() {
    const initialTile = this.grid.getTile(this.playerInitialPosition || { i: 0, j: 0 });
    const { x, y } = initialTile.getCenter();
    this.player = new Player(this, x, y);
  }

  createGrid() {
    const map = this.cache.json.get(`area_${this.area}`);
    this.grid = new WorldGrid(
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
