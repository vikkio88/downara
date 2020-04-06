import { helper, DIRECTIONS } from 'lib/game';

const { NORTH: n, SOUTH: s, EAST: e, WEST: w } = DIRECTIONS;
const testingMap = { 0: { [n]: 1 }, 1: { [s]: 0 } };

describe('Map Movements', () => {
    describe('moving validation', () => {
        it('returns new position correctly if move is correct', () => {
            let { result, payload } = helper.move(n, testingMap, 0);
            expect(result).toBe(true);
            expect(payload.position).toBe(1);
        });
        
        it('returns old position and false if move is not correct', () => {
            let { result, payload } = helper.move(e, testingMap, 0);
            expect(result).toBe(false);
            expect(payload.position).toBe(0);
        });
    });
});
