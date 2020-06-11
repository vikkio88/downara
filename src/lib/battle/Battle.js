import { OBJECTS } from './Field';
export const ACTIONS = {
    MOVE: 'move',
    ATTACK: 'attack',
    PARRY: 'parry',
    CHANGE_FACING: 'change_facing',
    USE_ITEM: 'use_item'
};

export class Battle {
    constructor(field, characters = []) {
        this.field = field;

        this.characterMap = new Map();
        this.characters = characters;

        this.finished = false;

        this.humanId = null;
        this.enemies = [];
        this.aliveEnemies = [];

        this.loadCharacters();
        this.resolveOrder = [];
        this.turns = this.initTurns();
        this.needsResolving = false;
        this.moves = {};
        this.log = {};
    }

    initTurns() {
        // I will put user playing firs all the time
        // then ordering the actions
        const human = this.characters.find(c => !c.isAi());

        this.humanId = human ? human.id : null;
        this.enemies = this.humanId ?
            this.characters.filter(c => c.id !== this.humanId)
            : this.characters;

        this.aliveEnemies = [...this.enemies];

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
            this.field.placeObject(
                { type: OBJECTS.CHARACTER, id: character.id },
                character.getPosition()
            );
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

    getPositionById(id) {
        const character = this.getCharacter(id);
        return character.getPosition();
    }

    getHuman() {
        if (!this.humanId) return null;
        return this.getCharacter(this.humanId);
    }

    getHumanPosition() {
        if (!this.humanId) return null;
        return this.getPositionById(this.humanId);
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
            // maybe here I can check if dead return false or register fake action?
            playerMove = character.decideAction(this);
            this.registerAction(turnId, playerMove.type, playerMove.payload);
            return true;
        }

        return false;
    }

    getStatus() {
        let finished = false, winner = false, deaths = [];
        const human = this.getHuman();
        if (human && human.getHealthPoints() <= 0) {
            return { finished: true, winner: false };
        }

        for (const enemy of this.aliveEnemies) {
            if (enemy.getHealthPoints() <= 0) {
                deaths.push(enemy.id);
            }
        }

        this.aliveEnemies = this.aliveEnemies.filter(e => !deaths.includes(e.id));
        if (this.aliveEnemies.length === 0) {
            return { finished: true, winner: true, deaths };
        }

        return { finished, winner, deaths };
    }

    loop() {
        // preventing looping if user needs to move
        if (this.getCharacterIdTurn() === this.humanId) return false;

        while (!this.needsResolving) {
            this.getNextAction();
        }
        return true;
    }


    /**
     * Example result
     * [
            {
                "turn": 0,
                "id": "player",
                "move": {
                    "id": "player",
                    "type": "move",
                    "payload": {
                        "position": {
                            "i": 1,
                            "j": 1
                        }
                    }
                },
                "result": {
                    "position": {
                        "i": 1,
                        "j": 1
                    }
                }
            },
            {
                "turn": 0,
                "id": "enemy",
                "move": {
                    "id": "enemy",
                    "type": "move",
                    "payload": {
                        "position": {
                            "i": 1,
                            "j": 1
                        }
                    }
                },
                "result": false
            }
        ]
     */
    resolve() {
        // get what turn we are
        const { turn } = this.turns;

        // get the order of actions
        const order = this.resolveOrder;
        // perform actions for each character
        const log = [];
        const movesInTurn = this.moves[turn];
        // moves in turn is an array, as someone might be able to play twice
        // we need to sort it
        const orderedMoves = movesInTurn.sort((m, m1) => order.indexOf(m.id) > order.indexOf(m1.id) ? 1 : -1);
        for (let index in orderedMoves) {
            const move = orderedMoves[index];
            const character = this.getCharacter(move.id);

            const result = character.perform(move, this);

            log.push({
                turn,
                id: move.id,
                move,
                result
            });
        }

        this.log[turn] = log;
        //increment turn
        this.turns.turn++;
        this.needsResolving = false;


        // Need to consider the deaths too
        const { finished, winner, deaths } = this.getStatus();
        this.finished = finished;

        if (deaths && deaths.length) {
            this.removeDeathsFromTurn(deaths);
        }

        return { finished, winner, deaths, currentTurnResult: log };
    }

    removeDeathsFromTurn(deaths = []) {
        this.turns.order = this.turns.order.filter(id => !deaths.includes(id));
    }
}