import { eventBridge } from 'lib';
import Tile from "../Tile";

export default class extends Tile {
    constructor(scene, size, { i, j }, { x, y }, textureKey = undefined, blocked = false) {
        super(scene, size, { i, j }, { x, y }, textureKey, blocked);
        this.disableInteractive();
    }
    onClick() {
        eventBridge.emitFromPhaser('battle:tileClicked', this.gridIndexes);
    }

    setActionable() {
        this.setTint(0x00ff00);
        this.setInteractive();
    }

    reset() {
        this.setTint(0xffffff);
    }
}