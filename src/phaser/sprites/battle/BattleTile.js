import { eventBridge } from 'lib';
import get from 'lodash.get';
import SPRITES from 'downara/sprites';
import Tile from "../Tile";

export default class extends Tile {
    constructor(scene, size, { i, j }, { x, y }, textureKey = undefined, blocked = false) {
        super(scene, size, { i, j }, { x, y }, textureKey, blocked);
        this.disableInteractive();
    }
    onClick() {
        eventBridge.emitFromPhaser('battle:actionConfirmed', this.gridIndexes);
        if (this.callback) this.callback();
    }

    setActionable(callback) {
        this.setTint(0x00ff00);
        this.setInteractive();

        if (callback) this.callback = callback;
    }

    reportResult(result, negative = true) {
        const fill = negative ? '#ff0000' : '#00ff00';
        const stroke = negative ? '#fff' : '#000';
        const { x, y } = this.getCenter();
        // here there could be endurance or other effects, showing just health atm
        const value = Math.abs(get(result, 'results.enemy.0.health', 0));
        const text = this.scene.add.text(
            x, y - 30,
            value,
            {
                font: '30px monospace',
                fill,
                fontStyle: 'strong',
                strokeThickness: 2,
                stroke
            }
        );

        this.scene.tweens.add({
            targets: text,
            x: text.x, y: text.y - 40,
            alpha: { from: 1, to: .3 },
            duration: 1500,
            ease: 'circular.easeInOut',
            onComplete: () => text.destroy(),
            loop: false,
        });
    }

    showAttackSuccess(result, callback) {
        // here result has some info on the damage, will need to add it as text?
        const { x, y } = this.getCenter();
        this.indicator = this.scene.add.sprite(
            x,
            y,
            'mapTiles',
            SPRITES.getFrameByName(SPRITES.NAMES.SWORDS)
        ).setScale(3);
        // shake effect on camera when damage received
        this.scene.mainCamera.shake(500, .001);
        this.reportResult(result);

        if (callback) callback();
    }

    showFailedMove(callback) {
        const { x, y } = this.getCenter();
        this.indicator = this.scene.add.sprite(
            x,
            y,
            'mapTiles',
            SPRITES.getFrameByName(SPRITES.NAMES.CROSS)
        ).setScale(4);
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