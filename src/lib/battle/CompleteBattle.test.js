import { pg } from 'lib';
import { Battle } from './Battle';
import { Field } from './Field';
import { Character, FACING, AI } from './Character';



describe('Full Battle test (battletesting battle test testing battle testing battling the tests)', () => {
    test.only('full battle flow', () => {
        const HUMAN_ID = 'player';
        const ENEMY_ID = 'enemy';

        // some shit like this is what the store will give us
        const payload = {
            actors: [
                {
                    id: HUMAN_ID,
                    type: 'battlePlayer', // this is a sprite name
                    facing: FACING.RIGHT,
                    // I need to pass stats here too
                    i: 0, j: 0 // maybe this is always i:0 and j variable
                },
                {
                    id: ENEMY_ID,
                    type: 'battleEnemy', // this is a sprite name
                    facing: FACING.LEFT,
                    ai: AI.SIMPLE,
                    // I need to pass stats here too
                    i: 2, j: 2 // maybe this should always vary as long as it is not same as player
                },
            ],
            size: { i: 3, j: 3 } // this for testing purposes will be 3, usually 6
        };

        const { size, actors } = payload;
        // actors are  ↑ sent in gameState to phaser
        const characters = [];

        // this is used in phaser ↓
        const actorsCharacter = [];

        for (const actor of actors) {
            const char = Character.fromActor(actor);
            characters.push(char);
            actorsCharacter.push({
                ...actor,
                character: char.toJs()
            });

        }
        const battleInstance = new Battle(
            new Field({ size }),
            characters
        );

        // check that placement worked
        expect(battleInstance.field.getObject(pg(0, 0))).toEqual({
            id: 'player',
            type: 'character'
        });
        
        expect(battleInstance.field.getObject(pg(2, 2))).toEqual({
            id: 'enemy',
            type: 'character'
        });

        // check the loading was all completed
        expect(battleInstance.humanId).toBe(HUMAN_ID);
        expect(battleInstance.enemies.length).toBe(1);
        expect(battleInstance.aliveEnemies.length).toBe(1);

    });
});