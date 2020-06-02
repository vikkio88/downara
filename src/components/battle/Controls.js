import React from 'react';
import { useStoreon } from 'storeon/react';
import { Button } from '../common';

const Controls = () => {
    const { dispatch, battle: { tile, action } } = useStoreon('battle');
    return (
        <div className="flex-1 flex items-center justify-center">
            <Button
                className="flex-1"
                disabled={action && !tile}
                onClick={() => dispatch('battle:actionSelected', 'move')}
            >
                Move
            </Button>

            <Button
                className="flex-1"
                disabled={action && !tile}
                onClick={() => dispatch('battle:actionSelected', 'attack')}
            >
                Attack
            </Button>

            <Button
                className="flex-1"
                disabled={action && !tile}
                onClick={() => dispatch('battle:actionSelected', 'parry')}
            >
                Parry
            </Button>
        </div>
    );
};


export default Controls;