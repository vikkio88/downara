import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { ACTIONS_LABELS } from 'downara';
import { ACTIONS, areaHelper } from 'lib/game';

const Actions = () => {
    const { dispatch, gameState: { player, actionedTile } } = useStoreon('gameState');
    const { areaPosition: playerAreaPosition } = player;
    const isPlayerTile = areaHelper.isSameTile(actionedTile.position, playerAreaPosition);
    return (
        <div>
            <Button
                className="flex-1"
                label={ACTIONS_LABELS[ACTIONS.MOVE]}
                disabled={isPlayerTile}
                onClick={() => dispatch('moveToTile', actionedTile.position)}
            />

            <Button
                className="flex-1"
                label={ACTIONS_LABELS[ACTIONS.EXAMINE]}
                disabled={!isPlayerTile}
                onClick={() => dispatch('examine')}
            />
            
            <Button
                className="flex-1"
                label={ACTIONS_LABELS[ACTIONS.INTERACT]}
                disabled={!isPlayerTile}
                onClick={() => dispatch('interact')}
            />
        </div>
    );
};

export default Actions;