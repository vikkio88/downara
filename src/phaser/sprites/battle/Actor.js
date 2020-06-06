import Phaser from "phaser";
import { FACING } from "lib/battle";

const FACING_DIRECTIONS = {
    [FACING.UP]: 270,
    [FACING.DOWN]: 90,
    [FACING.RIGHT]: 0,
    [FACING.LEFT]: 180,
};


export default class extends Phaser.GameObjects.Sprite {
    constructor(scene, character, type, x, y) {
        super(scene, x, y, type, 0);
        this.scene.add.existing(this);
        this.character = character;
        this.facing = character.facing;
        this.setFacing(this.facing);
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
            this.x - 25, this.y - 50,
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
}