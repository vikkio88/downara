import Phaser from "phaser";
import { Boot, Battle, World } from "./scenes";

import config from "./config";

config.type = Phaser.AUTO;
config.scene = [Boot, Battle, World];
config.scale = {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
