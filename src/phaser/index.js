import Phaser from "phaser";
import { Boot, Battle, World } from "./scenes";

import config from "./config";

config.type = Phaser.AUTO;
config.scene = [Boot, Battle, World];
config.scale = {
    mode: Phaser.Scale.FIT,
    parent: 'gameNode',
    autoCenter: Phaser.Scale.FIT,
    width: window.innerWidth,
    height: window.innerHeight
};

const uiRoot = document.getElementById('uiRoot');
for (const eventName of ['mouseup', 'mousedown', 'touchstart', 'touchmove', 'touchend', 'touchcancel']) {
    uiRoot.addEventListener(eventName, e => e.stopPropagation());
}

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars