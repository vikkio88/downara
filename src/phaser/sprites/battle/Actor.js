import Phaser from "phaser";
import { eventBridge } from 'lib';
import SPRITES from 'downara/sprites';
import { FACING } from "lib/battle";

const FACING_DIRECTIONS = {
    [FACING.UP]: 270,
    [FACING.DOWN]: 90,
    [FACING.RIGHT]: 0,
    [FACING.LEFT]: 180,
};


export default class extends Phaser.GameObjects.Sprite {
    constructor(scene, grid, character, type, x, y) {
        super(scene, x, y, type, 0);
        this.scene.add.existing(this);
        this.grid = grid;
        // character comes from Character.toJs()
        this.character = character;
        this.facing = character.facing;
        this.setFacing(this.facing);

        // this is used to show stats on click
        if (this.character.ai) {
            // if an action is selected store will prevent this to be performed
            this.enableClick();
            grid.registerActionable(this);
            this.on('pointerdown', () => {
                this.setAlpha(.5);
                eventBridge.emitFromPhaser('battle:selectEnemy', this.character.id);
            });
            this.on('pointerout', () => {
                this.setAlpha(1);
            });
        }
    }

    enableClick() {
        this.setInteractive();
    }

    disableClick() {
        this.disableInteractive();
    }

    setFacing(facing) {
        this.setAngle(FACING_DIRECTIONS[facing] || FACING_DIRECTIONS[FACING.RIGHT]);
    }

    updateCharacter(character) {
        this.character = character;
        if (this.character.facing !== this.facing) {
            this.facing = this.character.facing;
            this.setFacing(this.facing);
        }
    }

    getPosition() {
        return this.character.position;
    }

    reportResult(action, success = false) {
        const fill = success ? '#fff' : '#ff0000';
        const stroke = success ? '#000' : '#fff';
        const text = this.scene.add.text(
            this.x - 25, this.y - 70,
            action,
            {
                font: '20px monospace',
                fill, align: 'center',
                fontStyle: 'strong',
                strokeThickness: 2,
                stroke
            }
        );

        this.scene.time.addEvent({
            delay: 1000,
            callback: () => text.destroy(),
            loop: false,
        });
    }

    showParry(callback) {
        const x = this.x;
        const y = this.y;
        const shield = this.scene.add.sprite(
            x,
            y,
            'mapTiles',
            SPRITES.getFrameByName(SPRITES.NAMES.SHIELD)
        ).setScale(5);


        this.scene.time.addEvent({
            delay: 1500,
            callback: () => {
                shield.destroy();
                callback && callback();
            },
            loop: false,
        });
    }

}