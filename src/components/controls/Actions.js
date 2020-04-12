import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { ACTIONS_LABELS } from 'downara';
import { ACTIONS, areaHelper } from 'lib/game';

const Actions = () => {
    const { dispatch, gameState: { player, actionedTile, worldPosition } } = useStoreon('gameState');
    const { areaPosition: playerAreaPosition } = player;
    return (
        <div>
            <Button
                className="flex-1"
                label={ACTIONS_LABELS[ACTIONS.MOVE]}
                disabled={areaHelper.isSameTile(actionedTile.position, playerAreaPosition)}
                onClick={() => dispatch('moveToTile', actionedTile.position)}
            />

            <Button
                className="flex-1"
                label="Esamina"
                disabled={!areaHelper.isSameTile(actionedTile.position, playerAreaPosition)}
                onClick={() => dispatch('examine')}
            />
        </div>
    );
};

export default Actions;