import { areaHelper } from 'lib/game';

describe('Area Movements', () => {
    describe('Area configuration', () => {

        it('returns correct info about tiles adjacency', () => {
            const p = { i: 1, j: 2 };
            const adjacentTiles = [
                { i: 0, j: 2 }, { i: 0, j: 1 },
                { i: 1, j: 1 }, { i: 2, j: 1 },
                { i: 2, j: 2 }
            ];
            const nonAdjacentTiles = [
                { i: 0, j: 0 },
                { i: 1, j: 0 },
                { i: 2, j: 0 },
            ];

            for (const i in adjacentTiles) {
                expect(areaHelper.isAdjacent(p, adjacentTiles[i])).toBe(true);
            }

            for (const i in nonAdjacentTiles) {
                expect(areaHelper.isAdjacent(p, nonAdjacentTiles[i])).toBe(false);
            }
        });

        it('returns correct info about tiles adjacency, with specific distance', () => {
            const p = { i: 1, j: 3 };
            const adjacentTiles = [
                { i: 0, j: 3 }, { i: 0, j: 2 }, { i: 0, j: 1 },
                { i: 1, j: 1 }, { i: 1, j: 2 },
                { i: 2, j: 3 }, { i: 2, j: 2 }, { i: 2, j: 1 },
                { i: 3, j: 3 }, { i: 3, j: 2 }, { i: 3, j: 1 },
            ];
            const nonAdjacentTiles = [
                { i: 0, j: 0 },
                { i: 1, j: 0 },
                { i: 2, j: 0 },
                { i: 3, j: 0 },
            ];

            for (const i in adjacentTiles) {
                expect(areaHelper.isAdjacent(p, adjacentTiles[i], 2, true)).toBe(true);
            };

            for (const i in nonAdjacentTiles) {
                expect(areaHelper.isAdjacent(p, nonAdjacentTiles[i], 2, false)).toBe(false);
            };
        });
    });
});