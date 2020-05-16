import React from 'react';
import { useStoreon } from 'storeon/react';

import { Actions, Message, Dialogue } from 'components/controls';
import { STATUSES } from 'lib/game';

const Controls = () => {
    const { gameState: { status }, ui: { message } } = useStoreon('gameState', 'ui');

    if (status === STATUSES.SPEAKING) {
        return (
            <div className="flex-1 flex items-center">
                {status === STATUSES.SPEAKING && !message && <Dialogue />}
            </div>
        );
    }

    return (
        <div className="flex-1 flex items-center justify-center">
            {message && <Message {...message} />}
            {status === STATUSES.IDLE && !message && <Actions />}
        </div>
    );
};

export default Controls;