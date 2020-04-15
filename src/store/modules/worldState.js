
import { initialWorldState } from 'downara';

export default store => {
    store.on('@init', () => {
        return {
            worldState: { ...initialWorldState },
        }
    });

    store.on('updateWorldPostDialogue', ({ worldState }, payload) => {
        // this needs to go on helper
        const { worldPosition, position, newDialoguePointer } = payload;
        worldState.objects[worldPosition][position.i][position.j].props.dialogue = newDialoguePointer;
        console.log('yo', worldState);
        return worldState;
    });

};