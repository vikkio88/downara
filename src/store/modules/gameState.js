import { STATUSES } from 'lib/game';

import { initialGameState } from 'downara';

import { battleHelper } from "lib/battle";


export default store => {
    store.on('@init', () => {
        return {
            gameState: {
                ...initialGameState,
            },
        };
    });

    store.on('phaserReady', ({ gameState }) => {
        const payload = battleHelper.payloadGenerator();
        store.dispatch('battle:init', payload);
        return { gameState: { ...gameState, status: STATUSES.FIGHTING } };
    });


};