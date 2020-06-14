import React from 'react';
import { useStoreon } from 'storeon/react';
import { HP, Endurance } from './Stats';
import CharSheets from './CharSheets';
import { Button } from '../common';

import { ACTIONS } from 'lib/battle/Battle';


const Controls = () => {
    const { dispatch, battle } = useStoreon('battle');
    const { tile, action, confirmation, selectedCharacters, lock, battleInstance } = battle;
    const human = battleInstance.getHuman();
    return (
        <div className="flex-1 flex flex-col">
            {selectedCharacters.length > 0 && (
                <CharSheets characters={selectedCharacters} />
            )}
            <div className="flex-1 flex flex-col bg-gray-400">
                <Endurance value={human.getEndurance()} max={human.getMaxValues().endurance} />
                <HP value={human.getHealthPoints()} max={human.getMaxValues().hp} />
                <div className="flex-1 flex items-center justify-center flex-col">
                    <div className="flex-1 flex items-center justify-center">
                        {action && <Button
                            disabled={!action}
                            onClick={() => dispatch('battle:cancelSelectedAction')}
                        >
                            Cancel
                        </Button>
                        }
                        {true && (
                            <>
                                <Button
                                    disabled={lock || (action && !tile)}
                                    onClick={() => dispatch('battle:actionSelected', ACTIONS.MOVE)}
                                >
                                    Move
                                </Button>

                                <Button
                                    disabled={lock || (action && !tile)}
                                    onClick={() => dispatch('battle:actionSelected', ACTIONS.ATTACK)}
                                >
                                    Attack
                                </Button>
                            </>
                        )}

                        {(!action || action === ACTIONS.PARRY) && (
                            <Button
                                disabled={lock || (action && !confirmation)}
                                onClick={() => dispatch(confirmation ? 'battle:actionConfirmed' : 'battle:actionSelected', ACTIONS.PARRY)}
                            >
                                Parry
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Controls;