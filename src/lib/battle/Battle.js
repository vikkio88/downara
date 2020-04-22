export class Battle {
    constructor(field, characters = []) {
        this.turn = 0;
        this.characterMap = new Map();
        this.characters = characters;

        this.loadCharacters();
    }

    loadCharacters() {
        for (const index in this.characters) {
            const character = this.characters[index];
            this.characterMap.set(character.id, characters);
        }
    }
}