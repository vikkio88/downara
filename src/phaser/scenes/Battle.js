import Phaser from "phaser";
import { eventBridge } from "lib";

import { BattleGrid } from "../sprites/battle";

export default class extends Phaser.Scene {
    constructor() {
        super({ key: "Battle" });
    }

    init(payload) {
        const { actors = [], map = [], size = { i: 6, j: 6 } } = payload;
        this.actors = actors;
        this.map = map;
        this.rows = size.i;
        this.columns = size.j;
        eventBridge.on('battle:showActionableTiles', payload => {
            console.log('[phaser] actionableTiles', payload);
            const { tiles } = payload;
            this.grid.highlight(tiles);
        });

        eventBridge.on('battle:resetActionableTiles', () => {
            this.grid.resetHighlighted();
        });

        eventBridge.on('battle:resolved', resolvedTurn => {
            this.grid.playTurnActions(resolvedTurn);
        });

        eventBridge.on('battle:finished', winner => {
            this.grid.destroy();
            const message = winner ? 'YOU WIN' : 'YOU DIED';
            const fill = winner ? '#00ff00' : '#ff0000';
            const stroke = winner ? '#fff' : '#000';
            // just trying to see what to do in here
            this.add.text(
                100, 100,
                message,
                {
                    font: '40px monospace',
                    fill, align: 'center',
                    fontStyle: 'strong',
                    strokeThickness: 2,
                    stroke
                }
            );
        });
    }

    create() {
        const marginJ = (window.innerWidth - 600) / 2;
        const marginI = (window.innerHeight - 600) / 2;
        this.grid = new BattleGrid(
            this,
            {
                actors: this.actors,
                map: this.map
            },
            { rows: this.rows, columns: this.columns, tileSize: 100, marginJ, marginI }
        );
        this.grid.create();

        this.setUpCamera();
    }

    setUpCamera() {
        this.mainCamera = this.cameras.main;
        this.mainCamera.startFollow(this.grid.player);
        this.mainCamera.setBounds(0, 0, this.widthInPixels, this.heightInPixels);
        this.mainCamera.zoom = 1;
        this.input.on('wheel', ({ deltaY }) => {
            console.log('wheel', { deltaY });
        });
    }
}