import { pg } from 'lib';
import { Field, OBJECTS, defaultConfig } from './Field';

describe('Field', () => {
    describe('init functions', () => {
        test('get single Tile', () => {
            const field = new Field;
            const tile = field.getTile(0, 0);
            expect(tile).toEqual(defaultConfig.defaultTile);
        });

        test('set custom tile', () => {
            const customTile = { terrain: 'f', blocked: true };
            const field = new Field({}, { 0: { 0: customTile, 1: { object: { type: OBJECTS.CHARACTER, id: 'someId' } } } });
            expect(field.getTile(0, 0)).toEqual({ ...customTile, object: null });
            expect(field.getTile(0, 1)).toEqual({ ...defaultConfig.defaultTile, object: { type: OBJECTS.CHARACTER, id: 'someId' } });
        });
    });

    describe('tiles/object fetching/moving', () => {

        it('places object on tiles correctly', () => {
            const field = new Field;
            let objectOnTile = field.getObject(pg());
            expect(objectOnTile).toBe(null);
            const object = { type: OBJECTS.CHARACTER, id: 'someId' };
            field.placeObject(object, pg());
            objectOnTile = field.getObject(pg());
            expect(objectOnTile).toEqual(object);
        });

        it('moves object on tiles correctly', () => {
            const field = new Field;
            const object = { type: OBJECTS.CHARACTER, id: 'someId' };
            field.placeObject(object, pg());
            let objectOnTile = field.getObject(pg());
            expect(objectOnTile).toEqual(object);

            field.moveObject(pg(), pg(0, 1));
            objectOnTile = field.getObject(pg());
            expect(objectOnTile).toBe(null);
            objectOnTile = field.getObject(pg(0, 1));
            expect(objectOnTile).toEqual(object);
        });

        it('moves object on tiles correctly if free', () => {
            const field = new Field;
            const objectOrigin = { type: OBJECTS.CHARACTER, id: 'origin' };
            const object11 = { type: OBJECTS.CHARACTER, id: '11' };

            field.placeObject(object11, pg(1, 1));
            field.placeObject(objectOrigin, pg());

            let objectOnTile = field.getObject(pg());
            expect(objectOnTile).toEqual(objectOrigin);
            objectOnTile = field.getObject(pg(1, 1));
            expect(objectOnTile).toEqual(object11);

            let moveResult = field.moveObjectIfFree(pg(), pg(1, 1));
            expect(moveResult).toBe(false);
            moveResult = field.moveObjectIfFree(pg(), pg(0, 1));
            expect(moveResult).toBe(true);
            objectOnTile = field.getObject(pg(1, 1));
            expect(objectOnTile).toEqual(object11);
            objectOnTile = field.getObject(pg(0, 0));
            expect(objectOnTile).toBe(null);
            objectOnTile = field.getObject(pg(0, 1));
            expect(objectOnTile).toEqual(objectOrigin);
        });

    });

    describe('positioning', () => {
        it('correctly reports if tiles are adjacent', () => {
            const field = new Field();
            expect(field.areTilesAdjacent(pg(), { i: 0, j: 1 })).toBe(true);
        });

        it('calculates distances correctly in a 2x2', () => {
            const size = { i: 2, j: 2 };
            const field = new Field({ size });

            expect(field.tiles.length).toBe(size.i);
            expect(field.tiles[0].length).toBe(size.j);

            expect(field.tilesDistance(pg(), pg())).toBe(0);
            expect(field.tilesDistance(pg(), pg(0, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 0))).toBe(1);
        });

        it('calculates distances correctly in a 4x4', () => {
            const size = { i: 4, j: 4 };
            const field = new Field({ size });

            expect(field.tiles.length).toBe(size.i);
            expect(field.tiles[0].length).toBe(size.j);

            expect(field.tilesDistance(pg(), pg())).toBe(0);
            // distance 1
            expect(field.tilesDistance(pg(), pg(0, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 1))).toBe(1);
            expect(field.tilesDistance(pg(), pg(1, 0))).toBe(1);

            // distance 2
            expect(field.tilesDistance(pg(), pg(2, 0))).toBe(2);
            expect(field.tilesDistance(pg(), pg(2, 1))).toBe(2);
            expect(field.tilesDistance(pg(), pg(2, 2))).toBe(2);
            expect(field.tilesDistance(pg(), pg(1, 2))).toBe(2);
            expect(field.tilesDistance(pg(), pg(0, 2))).toBe(2);

            // distance 3
            expect(field.tilesDistance(pg(), pg(3, 0))).toBe(3);
            expect(field.tilesDistance(pg(), pg(3, 1))).toBe(3);
            expect(field.tilesDistance(pg(), pg(3, 2))).toBe(3);
            expect(field.tilesDistance(pg(), pg(3, 3))).toBe(3);
            expect(field.tilesDistance(pg(), pg(2, 3))).toBe(3);
            expect(field.tilesDistance(pg(), pg(1, 3))).toBe(3);
            expect(field.tilesDistance(pg(), pg(0, 3))).toBe(3);

            // spot check
            expect(field.tilesDistance(pg(3, 3), pg(2, 3))).toBe(1);
            expect(field.tilesDistance(pg(2, 2), pg(0, 2))).toBe(2);
            expect(field.tilesDistance(pg(3, 2), pg(1, 1))).toBe(2);
            expect(field.tilesDistance(pg(3, 3), pg(0, 1))).toBe(3);
        });

        it('returns a list of adjacent tiles given a default distance of 1', () => {
            const size = { i: 4, j: 4 };
            const field = new Field({ size });
            const expectedAdjacent = [
                pg(0, 0), pg(0, 1), pg(0, 2),
                pg(1, 0),/* self */ pg(1, 2),
                pg(2, 0), pg(2, 1), pg(2, 2),
            ];
            const adjacentTiles = field.getTilesAtRange(pg(1, 1));

            // checking result
            for (let i in expectedAdjacent) {
                const tile = expectedAdjacent[i];
                expect(adjacentTiles[tile.i][tile.j]).toBe(true);
            }
        });

        it('flattens the list of adjacent tiles given from the getTilesAtRange method', () => {
            const size = { i: 4, j: 4 };
            const field = new Field({ size });
            const expectedAdjacent = [
                pg(0, 0), pg(0, 1), pg(0, 2),
                pg(1, 0),/* self */ pg(1, 2),
                pg(2, 0), pg(2, 1), pg(2, 2),
            ];
            const adjacentTiles = field.getFlatTilesAtRange(pg(1, 1));
            expect(adjacentTiles).toEqual(expectedAdjacent);
        });

        it('returns a list of adjacent tiles given a default distance of 1, and centered in a corner', () => {
            const size = { i: 4, j: 4 };
            const field = new Field({ size });
            const expectedAdjacent = [
                /* self */, pg(0, 1),
                pg(1, 0), pg(1, 1),
            ];
            const adjacentTiles = field.getTilesAtRange(pg(0, 0));

            // checking result
            for (let i in expectedAdjacent) {
                const tile = expectedAdjacent[i];
                expect(adjacentTiles[tile.i][tile.j]).toBe(true);
            }
        });

        it('returns a list of adjacent tiles given a distance of 2, and centered in a corner', () => {
            const size = { i: 4, j: 4 };
            const field = new Field({ size });
            const expectedAdjacent = [
                /* self */, pg(0, 1), pg(0, 2),
                pg(1, 0), pg(1, 1), pg(1, 2),
                pg(2, 0), pg(2, 1), pg(2, 2)
            ];
            const adjacentTiles = field.getTilesAtRange(pg(0, 0), { maxD: 2 });

            // checking result
            for (let i in expectedAdjacent) {
                const tile = expectedAdjacent[i];
                expect(adjacentTiles[tile.i][tile.j]).toBe(true);
            }
        });

        it('calculates distance correctly', () => {
            const field = new Field({ size: pg(4, 4) });
            expect(field.tilesDistance(pg(0, 0), pg(0, 0))).toBe(0);
            expect(field.tilesDistance(pg(0, 0), pg(1, 0))).toBe(1);
            expect(field.tilesDistance(pg(0, 0), pg(0, 2))).toBe(2);
            expect(field.tilesDistance(pg(0, 0), pg(3, 3))).toBe(3);
        });

        it('returns the next step tile to get closer', () => {
            const field = new Field({ size: pg(4, 4) });
            expect(field.nextStepToTile(pg(0, 0), pg(0, 0))).toEqual({ i: 0, j: 0 });
            expect(field.nextStepToTile(pg(0, 0), pg(0, 2))).toEqual({ i: 0, j: 1 });
            expect(field.nextStepToTile(pg(0, 0), pg(0, 3))).toEqual({ i: 0, j: 1 });

            expect(field.nextStepToTile(pg(0, 0), pg(1, 0))).toEqual({ i: 0, j: 0 });
            expect(field.nextStepToTile(pg(0, 0), pg(2, 0))).toEqual({ i: 1, j: 0 });

            expect(field.nextStepToTile(pg(0, 0), pg(2, 2))).toEqual({ i: 1, j: 1 });
        });

        // Regression tests
        it('[REGRESSION] on a 6x6 Field on the bottom corner returns un-existing row 6', () => {
            const field = new Field({ size: pg(6, 6) });
            expect(field.getFlatTilesAtRange(pg(5, 0))).not.toEqual(expect.arrayContaining([pg(6, 0)]));
        });

        it('[REGRESSION] on a 6x6 Field SimpleAI tries to move on wrong places', () => {
            const field = new Field({ size: pg(6, 6) });

            const nextStep = field.nextStepToTile(pg(2, 3), pg(0, 1));
            expect(nextStep).not.toEqual(pg(1, 1));
        });
    });
});