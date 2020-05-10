import Phaser from "phaser";
import { Boot, Battle, Game } from "./scenes";

import config from "./config";

config.type = Phaser.AUTO;
config.scene = [Boot, Battle, Game];

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
