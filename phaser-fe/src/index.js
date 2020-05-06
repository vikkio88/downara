import Phaser from "phaser";
import { Boot, Game } from "./scenes";

import config from "./config";

config.type = Phaser.AUTO;
config.scene = [Boot, Game];

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
