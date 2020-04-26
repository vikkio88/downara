const NPC_ALIGNMENT = {
    FRIENDLY: 'friendly',
    ENEMY: 'enemy',
};

const NPC = {
    MUM: 'mum'
};

const LOCATIONS = {
    BAKERY: 'bakery',
    MATRICE: 'matrice',
    CAFE_HOUSE: 'cafe_house',
    BEVAIO_PORTA_NUOVA: 'bevaio_pn',
};

const OBJECT_DESCRIPTIONS = {
    [NPC.MUM]: `È tua mamma.`,
    [LOCATIONS.BAKERY]: `Il Panificio della Zza Maria`,
    [LOCATIONS.MATRICE]: `La Matrice, che edificio brutto...`,
    [LOCATIONS.CAFE_HOUSE]: `Il Cafè House, da qua la vista è spettacolare.`,
    [LOCATIONS.BEVAIO_PORTA_NUOVA]: `Il Bevaio di Porta Nuova, puzza di cacca di pecora...`,

    ROAD_SIGN: label => `Il cartello indica "${label}"`,
    default: `Non c'è niente di interessante.`
};

const MESSAGES = {
    INVALID_INTERACTION: `Niente da fare qui...`
};


const interactables = {
    [NPC.MUM]: {
        id: NPC.MUM,
        name: 'Mamma',
        object: 'npc_woman2',
        alignment: NPC_ALIGNMENT.FRIENDLY,
        description: OBJECT_DESCRIPTIONS[NPC.MUM]
    },
    [LOCATIONS.BAKERY]: {
        object: 'mansion1',
        id:LOCATIONS.BAKERY,
        name: 'Zza Maria (Panificio)',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.BAKERY]
    },
    [LOCATIONS.MATRICE]: {
        object: 'castle',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.MATRICE]
    },
    [LOCATIONS.CAFE_HOUSE]: {
        object: 'tower',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.CAFE_HOUSE]
    },
    [LOCATIONS.BEVAIO_PORTA_NUOVA]: {
        object: 'pond',
        description: OBJECT_DESCRIPTIONS[LOCATIONS.BEVAIO_PORTA_NUOVA]
    },
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
    default: 'flag_red'
};

export { interactables, LOCATIONS, NPC, NPC_ALIGNMENT, OBJECT_DESCRIPTIONS, MESSAGES, FLAGS };