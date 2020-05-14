import Phaser from "phaser";
import { Player, Grid } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "World" });
  }

  create() {
    this.createGrid();
    this.createPlayer();

    /*
    eventBridge.on('ui:pause', () => {
      this.input.enabled = false;
    });
    
    eventBridge.on('ui:resume', () => {
      this.input.enabled = true;
    });
    */

  }

  createPlayer() {
    this.player = new Player(this, 50, 50);
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.widthInPixels, this.heightInPixels);
  }

  createGrid() {
    this.grid = new Grid(this, { rows: 30, columns: 30 });
    this.grid.create();
  }

  update() { }
}
