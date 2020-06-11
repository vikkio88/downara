import Phaser from "phaser";
const TILES = {
    GRASS: 'grass',
    DIRT: 'dirt',
    SAND: 'sand',
    STREET: 'street',
};
export default class extends Phaser.GameObjects.TileSprite {
    constructor(
        scene, size, { i, j },
        { x, y }, textureKey = TILES.GRASS, blocked = false
    ) {
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
            this.onClick();
        });
        this.on('pointerout', () => {
            this.setAlpha(1);
        });
    }

    onClick() {
        console.log('Tile clicked', this.gridIndexes);
    }

    highlight() {
        this.setTint(0x00ff00);
        const border = this.scene.add.graphics();
        border.lineStyle(3, 0xffffff, 1);
        border.strokeRoundedRect(3, 3, 94, 94, 10);
        border.x = this.x;
        border.y = this.y;
        border.alpha = 0;

        this.scene.tweens.add({
            targets: border,
            duration: 600,
            delay: 300,
            alpha: 1,
            repeat: 3,
            onComplete: () => this.setTint(0xffffff),
            yoyo: true
        });
    }
}