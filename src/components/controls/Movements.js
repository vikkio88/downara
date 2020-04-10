import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { DIRECTIONS, mapHelper } from 'lib/game';
import { DIRECTIONS_LABELS } from 'downara';
const { NORTH: n, SOUTH: s, EAST: e, WEST: w } = DIRECTIONS;

const Movements = () => {
    const { dispatch, gameState: { area } } = useStoreon('gameState');
    return (
        <div className='flex flex-col items-center justify-center'>
            <Button
                key={n}
                label={DIRECTIONS_LABELS[n]}
                onClick={() => { dispatch('move', n) }}
                disabled={mapHelper.isValidDirection(area[n])}
            />
            <div className='flex flex-row'>
                {[e, s, w].map(d => (
                    <Button
                        key={d}
                        label={DIRECTIONS_LABELS[d]}
                        onClick={() => { dispatch('move', d) }}
                        disabled={mapHelper.isValidDirection(area[d])}
                    />
                ))}
            </div>
        </div>
    );
};

export default Movements;