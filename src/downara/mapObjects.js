const NPC_ALIGNMENT = {
    FRIENDLY: 'friendly',
    ENEMY: 'enemy',
};

const NPC = {
    MUM: 'mum'
};

const LOCATIONS = {
    BAKERY: 'bakery'
};

const OBJECT_DESCRIPTIONS = {
    [NPC.MUM]: `C'è tua madre.`,
    [LOCATIONS.BAKERY]: `Il Panificio`,
    default: `Non c'è niente di interessante.`
};

const MESSAGES = {
    INVALID_INTERACTION: `Niente da fare qui...`
}


const interactables = {
    [NPC.MUM]: {
        id: NPC.MUM,
        name: 'Mamma',
        object: 'woman_1',
        alignment: NPC_ALIGNMENT.FRIENDLY,
        description: OBJECT_DESCRIPTIONS[NPC.MUM],
        interaction: true
    },
    [LOCATIONS.BAKERY]: {
        object: 'house_3',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.BAKERY],
        interaction: false
    }
};


export { interactables, LOCATIONS, NPC, NPC_ALIGNMENT, OBJECT_DESCRIPTIONS, MESSAGES };