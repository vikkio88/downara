import Phaser from "phaser";
import { Player, Grid } from "../sprites";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "World" });
  }

  create() {
    this.createGrid();
    this.createPlayer();
  }

  createPlayer() {
    this.player = new Player(this, 0, 0);
    Phaser.Display.Align.In.Center(
      this.player,
      this.add.zone(400, 300, 800, 600)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.widthInPixels, this.heightInPixels);
    this.input.on("pointerdown", ({ worldX, worldY }) => {
      this.player.moveTo(worldX, worldY);
    });
  }

  createGrid() {
    this.grid = new Grid(this);
    this.grid.create();
  }

  update() { }
}
