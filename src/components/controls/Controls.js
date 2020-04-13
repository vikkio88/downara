import React from 'react';
import { useStoreon } from 'storeon/react';

import { Actions, Message, Dialogue } from 'components/controls';
import { STATUSES } from 'lib/game';

const Controls = () => {
    const { gameState: { status } } = useStoreon('gameState');
    const { ui: { message } } = useStoreon('ui');
    return (
        <div className={`flex-1 flex items-center justify-center`}>
            {message && <Message />}
            {status === STATUSES.IDLE && !message && <Actions />}
            {status === STATUSES.SPEAKING && !message && <Dialogue />}
        </div>
    );
};

export default Controls;