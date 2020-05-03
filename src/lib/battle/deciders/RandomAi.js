import { randomizer } from 'lib';
import { ACTIONS } from '../Character';
export default class SimpleAi {
    constructor(traits) {
        this.traits = traits;
    }

    decide(self, battle) {
        const humanPosition = battle.getHumanPosition();
        const selfPosition = self.getPosition();
        const weaponReach = self.inventory.getWeapon().getReach();
        const targetDistance = battle.field.tilesDistance(selfPosition, humanPosition);

        let couldAttack = false;

        if (targetDistance > weaponReach) {
            couldAttack = true;
        }

        let actions = [ACTIONS.MOVE, ACTIONS.WAIT, ACTIONS.PARRY];
        if (couldAttack) {
            actions.push(ACTIONS.ATTACK);
        }

        const action = randomizer.pickOne(actions);

        if (action === ACTIONS.ATTACK) {
            return {
                type: ACTIONS.ATTACK,
                payload: {
                    position: humanPosition
                }
            };
        }

        if ([ACTIONS.PARRY, ACTIONS.WAIT].includes(action)) {
            return { type: action };
        }

        // get a flat list of adjacent tiles
        const possibleTiles = battle.field.getFlatTilesAtRange();
        return {
            type: ACTIONS.MOVE,
            payload: {
                position: randomizer.pickOne(possibleTiles)
            }
        };
    }
}