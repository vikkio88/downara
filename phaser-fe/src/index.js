import Phaser from "phaser";
import { Boot, Game } from "./scenes";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Boot, Game],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
