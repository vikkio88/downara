import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { DIRECTIONS } from 'lib/game';
import { DIRECTIONS_LABELS } from 'downara';
const { NORTH: n, SOUTH: s, EAST: e, WEST: w } = DIRECTIONS;
const directions = Object.values(DIRECTIONS);

const Movements = () => {
    const { dispatch, gameState: { area } } = useStoreon('gameState');
    return (
        <div className='flex flex-col items-center justify-center'>
            <Button
                key={n}
                label={DIRECTIONS_LABELS[n]}
                onClick={() => { dispatch('move', n) }}
                disabled={area[n] == undefined}
            />
            <div className='flex flex-row'>
                {[e, s, w].map(d => (
                    <Button
                        key={d}
                        label={DIRECTIONS_LABELS[d]}
                        onClick={() => { dispatch('move', d) }}
                        disabled={area[d] == undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default Movements;