import { ACTIONS } from '../Character';
export default class SimpleAi {
    decide(self, battle) {
        // get enemy position
        // is within reach?
        //     attack, parry or wait (if needs endurance)
        // else
        //     move towards enemy

        const humanPosition = battle.getHumanPosition();
        const selfPosition = self.getPosition();
        const weaponReach = self.inventory.getWeapon().getReach();

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
                type: ACTIONS.ATTACK,
                payload: {
                    position: humanPosition
                }
            };
        }


        //here maybe some other moves
    }
}