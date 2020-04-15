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
            message: 'Ah... ok, sei passato dalla zza Maria?', replies: [
                { link: 3, message: 'Chi è la zza Maria?' },
                { link: 4, message: 'Ovvio che no!' },
            ]
        },
        2: {
            message: 'Oh! Sto parlando con te!', replies: [
                { link: 1, message: `Che c'è?` },
                { link: 1, message: 'Che vvolevi dirmi?' },
            ]
        },
        3: {
            message: 'La signora del panificio! Prendi mezzo chilo di pane e due panini vuoti...', replies: [
                { link: 4, message: 'Lo consideri fatto milady!' },
                { link: 4, message: '*Guarda intensamente un punto nel vuoto*' },
            ]
        },
        4: {
            message: 'Ok! Ti aspetto a casa. A Dopo',
            replies: [],
            
        },

    }
};