import { randomizer } from 'lib';
import { ACTIONS } from '../Character';

export default class Roamer {

    decide(self, battle) {
        const selfPosition = self.getPosition();
        const adjTiles = battle.field.getFlatTilesAtRange(selfPosition);

        return {
            type: ACTIONS.MOVE,
            payload: {
                position: randomizer.pickOne(adjTiles)
            }
        };
    }
}