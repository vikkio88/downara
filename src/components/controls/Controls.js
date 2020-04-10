import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import { Button } from 'components/common';

import { Movements, Actions } from 'components/controls';
import { STATUSES } from 'lib/game';

const Controls = () => {
    const { gameState: { status } } = useStoreon('gameState');
    const [moving, setMoving] = useState(true);
    return (
        status === STATUSES.IDLE && (
            <>
                <div className={`
                flex-1 flex flex-col
                items-center justify-center`}
                >
                    {moving && <Movements />}
                    {!moving && <Actions />}
                </div>
                <Button
                    label={moving ? ">" : "<"}
                    noPadding
                    secondary
                    onClick={() => setMoving(!moving)}
                />
            </>
        )
    );
};

export default Controls;