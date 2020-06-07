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
        const weaponReach = self.getWeapon().getReach();

        const targetDistance = battle.field.tilesDistance(selfPosition, humanPosition);

        const endurance = self.getEndurance();

        if (endurance < 30) {
            return {
                type: ACTIONS.PARRY,
                payload: {
                    position: null
                }
            };
        }

        if (targetDistance > weaponReach) {
            //@TODO there is a bug here need to check
            const nextStep = battle.field.nextStepToTile(selfPosition, humanPosition);
            console.log(`AI: is at ${selfPosition.i},${selfPosition.j}  human is at: ${humanPosition.i},${humanPosition.j}  || next step ${nextStep.i},${nextStep.j}`);
            return {
                type: ACTIONS.MOVE,
                payload: {
                    position: nextStep
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