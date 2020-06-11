import Tile from "./Tile";

export default class extends Tile {
    onClick() {
        const { x, y } = this.getCenter();
        this.scene.player.moveTo({ x, y }, this.gridIndexes);
    }
}