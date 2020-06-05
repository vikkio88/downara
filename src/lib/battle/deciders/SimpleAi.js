import { randomizer } from 'lib';
import { ACTIONS } from '../Character';
export default class SimpleAi {
    constructor(traits) {
        const { defensiveness } = traits;
        this.defensiveness = defensiveness;
    }

    attackOrParry() {
        if (randomizer.chance(this.defensiveness)) {
            return ACTIONS.PARRY;
        }

        return ACTIONS.ATTACK;
    }

    decide(self, battle) {
        // get enemy position
        // is within reach?
        //     attack, parry or wait (if needs endurance)
        // else
        //     move towards enemy

        const humanPosition = battle.getHumanPosition();
        const selfPosition = self.getPosition();
        const weaponReach = 1;//self.inventory.getWeapon().getReach();

        const targetDistance = battle.field.tilesDistance(selfPosition, humanPosition);

        if (targetDistance > weaponReach) {
            return {
                type: ACTIONS.MOVE,
                payload: {
                    position: battle.field.nextStepToTile(selfPosition, humanPosition)
                }
            };
        }

        if (targetDistance <= weaponReach) {
            return {
                type: this.attackOrParry(),
                payload: {
                    position: humanPosition
                }
            };
        }


        //here maybe some other moves
    }
}