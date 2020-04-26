export class Battle {
    constructor(field, characters = []) {
        this.characterMap = new Map();
        this.characters = characters;

        this.loadCharacters();
        this.turns = this.calculateTurns();
        this.moves= {};
        this.log = {};
    }

    calculateTurns() {
        const order = this.characters
            .sort((c, c1) => c.getSpeed() <= c1.getSpeed() ? 1 : -1)
            .map(c => c.id);
        return {
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
}