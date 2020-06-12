import React from 'react';
import { useStoreon } from 'storeon/react';
import { HP } from './Stats';
import CharSheets from './CharSheets';
import { Button } from '../common';


const Controls = () => {
    const { dispatch, battle } = useStoreon('battle');
    const { tile, action, confirmation, selectedCharacters, lock, battleInstance } = battle;
    const human = battleInstance.getHuman();
    const hp = human.getHealthPoints();
    return (
        <div className="flex-1 flex flex-col">
            {selectedCharacters.length > 0 && (
                <CharSheets characters={selectedCharacters} />
            )}
            <div className="flex-1 flex flex-col bg-gray-400">
                {hp < 20 && <HP hp={hp} max={human.getMaxValues().hp} />}
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
                            disabled={lock || (action && !tile)}
                            onClick={() => dispatch('battle:actionSelected', 'move')}
                        >
                            Move
                    </Button>

                        <Button
                            disabled={lock || (action && !tile)}
                            onClick={() => dispatch('battle:actionSelected', 'attack')}
                        >
                            Attack
                    </Button>

                        <Button
                            disabled={lock || (action && !confirmation)}
                            onClick={() => dispatch(confirmation ? 'battle:actionConfirmed' : 'battle:actionSelected', 'parry')}
                        >
                            Parry
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Controls;