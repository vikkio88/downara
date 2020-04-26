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
        this.turns = this.calculateTurns();
        this.needsResolving = false;
        this.moves = {};
        this.log = {};
    }

    calculateTurns() {
        const order = this.characters
            .sort((c, c1) => c.getSpeed() <= c1.getSpeed() ? 1 : -1)
            .map(c => c.id);
        return {
            turn: 0,
            index: 0,
            count: 0,
            order,
            next: order[0],
            last: null
        }
    }

    loadCharacters() {
        for (const index in this.characters) {
            const character = this.characters[index];
            this.characterMap.set(character.id, character);
        }
    }

    getCurrentTurn() {
        return this.turns.next;
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

    resolve() {

    }
}