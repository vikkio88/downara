import { pg } from 'lib';
import { Battle, ACTIONS } from './Battle';
import { Field } from './Field';
import { inventoryGenerator } from './Inventory';
import { InfallibleFists } from './Equipment';
import { Character, FACING, AI, statsGenerator } from './Character';



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
                    stats: statsGenerator({ weapon: new InfallibleFists }),
                    inventory: inventoryGenerator(),
                    i: 0, j: 0 // maybe this is always i:0 and j variable
                },
                {
                    id: ENEMY_ID,
                    type: 'battleEnemy', // this is a sprite name
                    facing: FACING.LEFT,
                    ai: AI.SIMPLE,
                    // I need to pass stats here too
                    stats: statsGenerator({ hp: 1 }),
                    inventory: inventoryGenerator(),
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
            id: HUMAN_ID,
            type: 'character'
        });

        expect(battleInstance.field.getObject(pg(2, 2))).toEqual({
            id: ENEMY_ID,
            type: 'character'
        });

        // check the loading was all completed
        expect(battleInstance.humanId).toBe(HUMAN_ID);
        expect(battleInstance.enemies.length).toBe(1);
        expect(battleInstance.aliveEnemies.length).toBe(1);

        // check if stats propagated correctly
        expect(battleInstance.getHuman(HUMAN_ID).getHealthPoints()).toBe(100);
        expect(battleInstance.getHuman(HUMAN_ID).getShield()).toBe(0);
        expect(battleInstance.getCharacter(ENEMY_ID).getHealthPoints()).toBe(1);
        expect(battleInstance.getCharacter(ENEMY_ID).getShield()).toBe(0);

        // this should be changed when I add stats loading to fromActor
        expect(battleInstance.resolveOrder).toEqual([
            HUMAN_ID, ENEMY_ID
        ]);
        expect(battleInstance.needsResolving).toBe(false);


        // NOW WE CAN START THE BATTLE


        // FIRST TURN
        // first player select a move and a tile
        let human = battleInstance.getCharacterIdTurn();
        // this should be human id
        // he choses first, but plays whenever his turn is
        expect(human).toBe(HUMAN_ID);
        // this will exit when all the AI played their move
        // I havent moved so this will exit
        expect(battleInstance.loop()).toBe(false);

        // as a first move I would move to 1,1
        // I know that SIMPLEAI will move there too, but will fail because I am already there
        // registering action
        battleInstance.registerAction(human, ACTIONS.MOVE, { position: { ...pg(1, 1) } });

        // now I can loop
        expect(battleInstance.loop()).toBe(true);

        // now the battle will need resolving
        expect(battleInstance.needsResolving).toBe(true);

        // resolving and getting results of this turn
        let result = battleInstance.resolve();
        let finished = result.finished;
        let currentTurnResult = result.currentTurnResult;

        expect(finished).toBe(false);
        expect(currentTurnResult.length).toBe(2);
        //console.log(JSON.stringify(currentTurnResult));
        let playerMove = currentTurnResult[0];
        let enemyMove = currentTurnResult[1];
        expect(Boolean(playerMove.result)).toBe(true);
        expect(playerMove.result).toEqual({ position: pg(1, 1) });
        expect(Boolean(enemyMove.result)).toBe(false);

        // checking if positions got updated
        expect(battleInstance.getHuman().getPosition()).toEqual(pg(1, 1));
        expect(battleInstance.field.getObject(pg(1, 1))).toEqual({
            id: HUMAN_ID,
            type: 'character'
        });
        expect(battleInstance.getPositionById(ENEMY_ID)).toEqual(pg(2, 2));
        expect(battleInstance.field.getObject(pg(2, 2))).toEqual({
            id: ENEMY_ID,
            type: 'character'
        });

        // SECOND TURN

        // now I think the AI will try to attack me so I go to 0,1
        human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, ACTIONS.MOVE, { position: { ...pg(0, 1) } });
        expect(battleInstance.loop()).toBe(true);
        expect(battleInstance.needsResolving).toBe(true);
        result = battleInstance.resolve();
        finished = result.finished;
        currentTurnResult = result.currentTurnResult;

        expect(finished).toBe(false);
        expect(currentTurnResult.length).toBe(2);
        //console.log(JSON.stringify(currentTurnResult));
        playerMove = currentTurnResult[0];
        enemyMove = currentTurnResult[1];
        expect(Boolean(playerMove.result)).toBe(true);
        expect(playerMove.result).toEqual({ position: pg(0, 1) });
        expect(enemyMove.move.type).toBe(ACTIONS.ATTACK);
        expect(Boolean(enemyMove.result)).toBe(false);


        // THIRD TURN
        // here I am sure that the AI will try to go 1,1
        // so I will go 1,2
        human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, ACTIONS.MOVE, { position: { ...pg(1, 2) } });
        expect(battleInstance.loop()).toBe(true);
        expect(battleInstance.needsResolving).toBe(true);
        result = battleInstance.resolve();
        finished = result.finished;
        currentTurnResult = result.currentTurnResult;
        expect(finished).toBe(false);
        expect(currentTurnResult.length).toBe(2);
        //console.log(JSON.stringify(currentTurnResult));
        playerMove = currentTurnResult[0];
        enemyMove = currentTurnResult[1];
        expect(Boolean(playerMove.result)).toBe(true);
        expect(Boolean(enemyMove.result)).toBe(true);
        expect(battleInstance.field.getObject(pg(1, 2))).toEqual({
            id: HUMAN_ID,
            type: 'character'
        });
        expect(battleInstance.field.getObject(pg(1, 1))).toEqual({
            id: ENEMY_ID,
            type: 'character'
        });

        //  FOURTH TURN
        // now I think I will make the player parry and the enemy will attack
        human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, ACTIONS.PARRY, {});
        expect(battleInstance.loop()).toBe(true);
        expect(battleInstance.needsResolving).toBe(true);
        result = battleInstance.resolve();
        finished = result.finished;
        currentTurnResult = result.currentTurnResult;
        //console.log(JSON.stringify(currentTurnResult));
        expect(finished).toBe(false);
        expect(currentTurnResult.length).toBe(2);
        playerMove = currentTurnResult[0];
        enemyMove = currentTurnResult[1];
        expect(Boolean(playerMove.result)).toBe(true);
        // this could rarely fail ↓
        expect(Boolean(enemyMove.result)).toBe(true);
        expect(battleInstance.field.getObject(pg(1, 2))).toEqual({
            id: HUMAN_ID,
            type: 'character'
        });
        expect(battleInstance.field.getObject(pg(1, 1))).toEqual({
            id: ENEMY_ID,
            type: 'character'
        });

        //  FIFTH TURN
        // now I think I will finish him
        human = battleInstance.getCharacterIdTurn();
        battleInstance.registerAction(human, ACTIONS.ATTACK, { position: pg(1, 1) });
        expect(battleInstance.loop()).toBe(true);
        expect(battleInstance.needsResolving).toBe(true);
        result = battleInstance.resolve();
        finished = result.finished;
        const winner = result.winner;
        currentTurnResult = result.currentTurnResult;
        console.log(JSON.stringify(currentTurnResult));
        expect(finished).toBe(true);
        expect(winner).toBe(true);
        expect(currentTurnResult.length).toBe(2);
        playerMove = currentTurnResult[0];
        enemyMove = currentTurnResult[1];
        expect(Boolean(playerMove.result)).toBe(true);
        expect(Boolean(enemyMove.result)).toBe(true);
        expect(battleInstance.field.getObject(pg(1, 2))).toEqual({
            id: HUMAN_ID,
            type: 'character'
        });
        expect(battleInstance.field.getObject(pg(1, 1))).toEqual({
            id: ENEMY_ID,
            type: 'character'
        });

    });
});