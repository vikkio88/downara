const range = (start, end) => Array.from({ length: end }, (_, i) => start + 1);
const randomizer = {
    pickOne(array) {
        return array[this.int(0, array.length - 1)]
    },
    int(low, high) {
        return Math.round(Math.random() * (high - low) + low);
    },
    chance(percentage) {
        return this.int(0, 99) < percentage;
    },
    dice(faces = 6) {
        return this.int(1, faces);
    }
};
export { range, randomizer };