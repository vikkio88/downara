import { FLAGS } from 'downara/mapObjects';

export default {
    0: {
        title: 'Compra il Pane per la Mamma.',
        description: 'Vai dalla zza Maria e compra il pane per la mamma.',
        flag: { w: 0, position: { i: 5, j: 4 } },
        previousFlag: { w: 0, position: { i: 2, j: 3 } },
        flagIcon: FLAGS.default,
        inventory: {
            money: 1000
        }
    }
}