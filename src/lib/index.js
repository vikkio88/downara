import get from 'lodash.get';

const range = (start, end) => Array.from({ length: end }, (_, i) => start + 1);

const randomizer = {
    pickOne(array) {
        return array[this.int(0, array.length - 1)];
    },
    int(low, high) {
        return Math.round(Math.random() * (high - low) + low);
    },
    chance(percentage) {
        return this.int(0, 99) < percentage;
    },
    dice(faces = 6) {
        return this.int(1, faces);
    },
    bool() {
        return this.chance(50);
    },
    tile({ i = null, j = null, size = 6 }) {
        i = i !== null ? i : this.int(0, size - 1);
        j = j !== null ? j : this.int(0, size - 1);
        return { i, j };
    }
};

const eventBridge = {
    emit(event, payload) {
        if (!window.eventBridge) return false;

        window.eventBridge.emit(event, payload);
        return true;
    },
    on(event, callback) {
        if (!window.eventBridge) return false;

        window.eventBridge.on(event, callback);
        return true;
    },
    emitFromPhaser(type, payload = null) {
        this.emit('phaser:storeon', { type, payload });
    }
};

const extractFromCoordinates = ({ i, j }, mapping, fallback = null) => get(mapping, `${i}.${j}`, fallback);

/**
 * Position Generator pg
 * Generating position object
 * 
 * @param Number i row index
 * @param Number j column index
 */
const pg = (i = 0, j = 0) => ({ i, j });

export { range, randomizer, eventBridge, extractFromCoordinates, pg };