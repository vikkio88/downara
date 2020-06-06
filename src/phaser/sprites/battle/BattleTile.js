import { eventBridge } from 'lib';
import SPRITES from 'downara/sprites';
import Tile from "../Tile";

export default class extends Tile {
    constructor(scene, size, { i, j }, { x, y }, textureKey = undefined, blocked = false) {
        super(scene, size, { i, j }, { x, y }, textureKey, blocked);
        this.disableInteractive();
    }
    onClick() {
        eventBridge.emitFromPhaser('battle:tileClicked', this.gridIndexes);
        if (this.callback) this.callback();
    }

    setActionable(callback) {
        this.setTint(0x00ff00);
        this.setInteractive();

        if (callback) this.callback = callback;
    }

    setFailedMove(callback) {
        const { x, y } = this.getCenter();
        this.indicator = this.scene.add.sprite(
            x,
            y,
            'mapTiles',
            SPRITES.getFrameByName(SPRITES.NAMES.CROSS)
        ).setScale(3);
        if (callback) callback();
    }

    resetIndicator() {
        if (this.indicator) this.indicator.destroy();
    }


    reset() {
        this.setTint(0xffffff);
        this.disableInteractive();
    }
}