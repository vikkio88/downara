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
}


const interactables = {
    [NPC.MUM]: {
        object: 'woman_1',
        alignment: NPC_ALIGNMENT.FRIENDLY,
        description: OBJECT_DESCRIPTIONS[NPC.MUM]
    },
    [LOCATIONS.BAKERY]: {
        object: 'house_3',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.BAKERY]
    }
};


export { interactables, LOCATIONS, NPC, NPC_ALIGNMENT, OBJECT_DESCRIPTIONS };