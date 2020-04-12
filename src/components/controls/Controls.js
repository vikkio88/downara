import React from 'react';
import { useStoreon } from 'storeon/react';

import { Actions, Message } from 'components/controls';
import { STATUSES } from 'lib/game';

const Controls = () => {
    const { gameState: { status } } = useStoreon('gameState');
    const { ui: { message } } = useStoreon('ui');
    return (
        status === STATUSES.IDLE && (
            <div className={`flex-1 flex items-center justify-center`}>
                {message && <Message />}
                {!message && <Actions />}
            </div>
        )
    );
};

export default Controls;