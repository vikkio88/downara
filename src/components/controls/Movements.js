import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { DIRECTIONS } from 'lib/game';
import { DIRECTIONS_LABELS } from 'downara';

const directions = Object.values(DIRECTIONS);

const Movements = () => {
    const { dispatch, gameState: { area } } = useStoreon('gameState');
    return (
        <div className='flex flex-row'>
            {directions.map(d => (
                <Button
                    key={d}
                    label={DIRECTIONS_LABELS[d]}
                    onClick={() => { dispatch('move', d) }}
                    disabled={area[d] == undefined}
                />
            ))}
        </div>
    );
};

export default Movements;