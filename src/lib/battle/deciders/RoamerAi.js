import { randomizer } from 'lib';
import { ACTIONS } from '../Character';

export default class Roamer {
    decide(self, battle) {
        const selfPosition = self.getPosition();
        const adjTiles = battle.field.getFlatTilesAtRange(selfPosition);
        let action = ACTIONS.MOVE;
        let position = randomizer.pickOne(adjTiles);
        const endurance = self.getEndurance();

        if (endurance < 30) {
            action = ACTIONS.PARRY;
            position = null;
        }

        return {
            type: action,
            payload: {
                position
            }
        };
    }
}