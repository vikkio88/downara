import React from 'react';
import { useStoreon } from 'storeon/react';
import Stats from './Stats';
import { Button, CloseRow } from '../common';

const Controls = () => {
    const { dispatch, battle } = useStoreon('battle');
    const { tile, action, confirmation, battleInstance, selectedEnemyId, lock } = battle;
    const human = battleInstance.getHuman();
    const selectedEnemy = selectedEnemyId ? battleInstance.getCharacter(selectedEnemyId) : null;
    return (
        <div className="flex-1 flex flex-col">
            {selectedEnemy && (
                <div className="flex-1 flex flex-col bg-gray-400 mb-10">
                    <CloseRow onClose={() => dispatch('battle:unselectEnemy', null)} />
                    <span className="font-semibold">{selectedEnemy.id}</span>
                    <Stats stats={selectedEnemy.getStats()} maxes={selectedEnemy.getMaxValues()} />
                </div>
            )}
            <div className="flex-1 flex flex-col bg-gray-400">
                <Stats stats={human.getStats()} maxes={human.getMaxValues()} />
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