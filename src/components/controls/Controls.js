import React from 'react';
import { useStoreon } from 'storeon/react';

import { Movements, Actions } from 'components/controls';
import { STATUSES } from 'lib/game'

const Controls = () => {
    const { gameState: { status } } = useStoreon('gameState');
    return (
        <div className={`
        flex-1 flex flex-col
        items-center justify-center
        `}>
            {status === STATUSES.IDLE && (
                <>
                    <Movements />
                    <Actions />
                </>
            )}
        </div>
    );
};

export default Controls;