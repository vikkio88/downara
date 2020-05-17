import Phaser from "phaser";
const TILES = {
    GRASS: 'grass',
    DIRT: 'dirt',
    SAND: 'sand',
    STREET: 'street',
};
export default class extends Phaser.GameObjects.TileSprite {
    constructor(scene, size, { i, j }, { x, y }, textureKey = TILES.GRASS, blocked = false) {
        super(
            scene,
            x, y,
            size, size,
            textureKey
        );

        this.gridIndexes = { i, j };
        this.setOrigin(0, 0);
        scene.add.existing(this);
        this.setInteractive();

        blocked ? this.setupAsBlocked() : this.setupAsReachable();
    }

    setupAsBlocked() {
        this.on('pointerdown', () => {
            this.setTint(0xff0000);
        });
        this.on('pointerout', () => {
            this.setTint(0xffffff);
        });
    }

    setupAsReachable() {
        this.on('pointerdown', () => {
            this.setAlpha(.5);
            const { x, y } = this.getCenter();
            this.scene.player.moveTo({ x, y }, this.gridIndexes);
        });
        this.on('pointerout', () => {
            this.setAlpha(1);
        });
    }
}