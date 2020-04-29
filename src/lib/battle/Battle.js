const ACTIONS = {
    MOVE: 'move',
    ATTACK: 'attack',
    PARRY: 'parry',
    USE_ITEM: 'use_item'
};

export class Battle {
    constructor(field, characters = []) {
        this.characterMap = new Map();
        this.characters = characters;

        this.finished = false;

        this.loadCharacters();
        this.resolveOrder = [];
        this.turns = this.calculateTurns();
        this.needsResolving = false;
        this.moves = {};
        this.log = {};
    }

    calculateTurns() {
        // I will put user playing firs all the time
        // then ordering the actions
        const human = this.characters.find(c => !c.isAi());
        let order = this.characters.sort((c, c1) => c.getSpeed() <= c1.getSpeed() ? 1 : -1).map(c => c.id);
        this.resolveOrder = [...order];
        order = human ? [human.id, ...(order.filter(id => id !== human.id))] : order;
        return {
            turn: 0,
            index: 0,
            count: 0,
            order,
            next: order[0],
            last: null
        };
    }


    loadCharacters() {
        for (const index in this.characters) {
            const character = this.characters[index];
            this.characterMap.set(character.id, character);
        }
    }

    getCurrentTurn() {
        return this.turns.turn;
    }

    getCharacterIdTurn() {
        return this.turns.next;
    }

    getCharacter(id) {
        return this.characterMap.get(id);
    }

    registerAction(id, type, payload) {
        const { index, count, order, turn } = this.turns;
        // registering move
        const move = this.moves[turn] || [];
        this.moves[turn] = move;
        this.moves[turn].push({ id, type, payload });

        // updating turn
        const nextIndex = (index + 1) % order.length;
        this.turns.index = nextIndex;
        this.turns.next = order[nextIndex];
        this.turns.last = order[index];
        this.turns.count++;

        if ((count % order.length) === order.length - 1) {
            this.turns.turn++;
            this.needsResolving = true;
        }
    }

    // this needs to be called in a way like
    /*

    player chooses action.
    
    while does not need resolving
        getNextAction()
    
    resolve()

    animation...

    is someone dead?
        finished
    else    
        new turn
     
    */
    getNextAction() {
        const turnId = this.getCharacterIdTurn();
        const character = this.getCharacter(turnId);

        let playerMove = null;
        if (character.isAi()) {
            playerMove = character.decideMove(this);
            this.registerAction(turnId, playerMove.type, playerMove.payload);
            return true;
        }

        return false;
    }

    resolve() {

    }
}