import { areaHelper } from 'lib/game';
import { FLAGS } from 'downara';

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

    describe('Area flags operations', () => {
        const initialFlagsExample = {
            flags: {
                0: {
                    2: { 3: { icon: FLAGS.default } }
                },
                1: {
                    3: { 1: { icon: FLAGS.default } }
                }
            }
        };

        it('removes the flag correctly', () => {
            const flags = areaHelper.removeFlag(0, { i: 2, j: 3 }, initialFlagsExample);

            expect(flags).toEqual({
                flags: {
                    0: {
                        2: {}
                    },
                    1: {
                        3: { 1: { icon: FLAGS.default } }
                    }
                }
            })
        });
    })
});