export default {
    // initial
    0: {
        0: {
            message: 'Oh, sei tu? Che fai qua?', replies: [
                { link: 1, message: 'Niente Ma, ho visto questa bandierina sulla casella e ho deciso di interagirci...' },
                { link: 2, message: '*Guarda intensamente un punto nel vuoto*' },
            ]
        },
        1: {
            message: 'Ah...Sei passato dalla zza Maria?', replies: [
                { link: 3, message: 'Chi è la zza Maria?' },
                { link: 4, message: 'Non ancora...' },
            ]
        },
        2: {
            message: 'Oh! Sto parlando con te!', replies: [
                { link: 1, message: `Che c'è?` },
                { link: 1, message: 'Che volevi dirmi?' },
            ]
        },
        3: {
            message: 'La signora del panificio! Prendi mezzo chilo di pane e due panini vuoti...', replies: [
                { link: 4, message: 'Lo consideri fatto milady!' },
                { link: 4, message: '*Guarda intensamente un punto nel vuoto*' },
            ]
        },
        4: {
            message: 'Ok! Sai dove si trova, giusto? Ti aspetto a casa. A Dopo. Prendi anche questi soldi.',
            replies: [],
            postDialogue: {
                worldState: true,
                gameState: true,
                quest: 0,
                newDialoguePointer: 1,
            }
        },
    },

    // after first quest
    1: {
        0: {
            message: 'Ancora qua sei? Vai dalla zza Maria, ricorda, mezzo chilo e due panini vuoti.',
            replies: []
        }
    }
};