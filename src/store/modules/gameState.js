import { STATUSES } from 'lib/game';

import { initialGameState } from 'downara';

import { battleHelper } from "lib/battle";


export default store => {
    store.on('@init', () => {
        return {
            gameState: {
                isLoading: true,
                ...initialGameState,
            },
        };
    });

    store.on('phaserReady', ({ gameState }) => {
        return { gameState: { ...gameState, isLoading: false, status: STATUSES.IDLE } };
    });

    store.on('startBattle', ({ gameState }) => {
        const payload = battleHelper.payloadGenerator();
        store.dispatch('battle:init', payload);
        return { gameState: { ...gameState, status: STATUSES.FIGHTING } };
    });

    store.on('interact', ({ }) => {
        store.dispatch('startBattle');
    });


};