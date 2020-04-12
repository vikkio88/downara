const NPC_ALIGNMENT = {
    FRIENDLY: 'friendly',
    ENEMY: 'enemy',
};

const NPC = {
    MUM: 'mum'
};

const OBJECT_DESCRIPTIONS = {
    [NPC.MUM]: `C'è tua madre.`,
    default: `Non c'è niente di interessante.`
}

const npcs = {
    [NPC.MUM]: {
        object: 'woman_1',
        alignment: NPC_ALIGNMENT.FRIENDLY,
        description: OBJECT_DESCRIPTIONS[NPC.MUM]
    }
};


export { npcs, NPC, NPC_ALIGNMENT, OBJECT_DESCRIPTIONS };