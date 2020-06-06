import React from 'react';
import { useStoreon } from 'storeon/react';
import Stats from './Stats';
import { Button, Progress } from '../common';

const Controls = () => {
    const { dispatch, battle: { tile, action, confirmation, battleInstance } } = useStoreon('battle');
    const human = battleInstance.getHuman();
    return (
        <div className="flex-1 flex flex-col">
            <Stats actor={human} />
            <div className="flex-1 flex items-center justify-center flex-col">
                {action && (
                    <div className="flex-1 flex items-center justify-center">
                        <Button
                            disabled={!action}
                            onClick={() => dispatch('battle:cancelSelectedAction')}
                        >
                            Cancel
                        </Button>
                    </div>
                )}

                <div className="flex-1 flex items-center justify-center">

                    <Button
                        disabled={action && !tile}
                        onClick={() => dispatch('battle:actionSelected', 'move')}
                    >
                        Move
                    </Button>

                    <Button
                        disabled={action && !tile}
                        onClick={() => dispatch('battle:actionSelected', 'attack')}
                    >
                        Attack
                    </Button>

                    <Button
                        disabled={(action && !confirmation)}
                        onClick={() => dispatch(confirmation ? 'battle:actionConfirmed' : 'battle:actionSelected', 'parry')}
                    >
                        Parry
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default Controls;