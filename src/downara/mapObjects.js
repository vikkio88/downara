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
        object: 'npc_woman2',
        alignment: NPC_ALIGNMENT.FRIENDLY,
        description: OBJECT_DESCRIPTIONS[NPC.MUM],
        interaction: true
    },
    [LOCATIONS.BAKERY]: {
        object: 'mansion1',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.BAKERY],
        interaction: false
    }
};


const FLAGS = {
    FLAG_RED: 'flag_red',
    FLAG_YELLOW: 'flag_yellow',
    FLAG_GREEN: 'flag_green',
    FLAG_BLUE: 'flag_blue',
    ARROW_UP: 'arrow_u',
    ARROW_BOTTOM: 'arrow_b',
    ARROW_RIGHT: 'arrow_r',
    ARROW_LEFT: 'arrow_l',
    ARROW_B_LEFT: 'arrow_bl',
    ARROW_B_RIGHT: 'arrow_br',
    ARROW_U_LEFT: 'arrow_ul',
    ARROW_U_RIGHT: 'arrow_ur',
};

export { interactables, LOCATIONS, NPC, NPC_ALIGNMENT, OBJECT_DESCRIPTIONS, MESSAGES, FLAGS };