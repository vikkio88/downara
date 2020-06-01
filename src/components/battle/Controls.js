import React from 'react';
import { useStoreon } from 'storeon/react';
import { Button } from '../common';

const Controls = () => {
    const { dispatch } = useStoreon();
    return (
        <div>
            <Button
                className="flex-1"
                onClick={() => dispatch('battle:actionSelected', 'move')}
            >
                Move
            </Button>
        </div>
    );
};


export default Controls;