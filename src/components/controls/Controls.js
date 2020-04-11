import React from 'react';
import { useStoreon } from 'storeon/react';

import { Actions } from 'components/controls';
import { STATUSES } from 'lib/game';

const Controls = () => {
    const { gameState: { status } } = useStoreon('gameState');
    return (
        status === STATUSES.IDLE && (
            <div className={`flex-1 flex flex-col items-center justify-center`}>
                <Actions />
            </div>
        )
    );
};

export default Controls;