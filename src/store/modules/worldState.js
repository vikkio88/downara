
import { initialWorldState } from 'downara';

export default store => {
    store.on('@init', () => {
        return {
            worldState: { ...initialWorldState },
        }
    });

};