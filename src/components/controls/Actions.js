import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { ACTIONS_LABELS } from 'downara';
import { ACTIONS, areaHelper } from 'lib/game';

const Actions = () => {
    const { dispatch, gameState: { player, actionedTile } } = useStoreon('gameState');
    const { areaPosition: playerAreaPosition } = player;
    return (
        <div>
            <Button
                className="flex-1"
                label="Move here"
                disabled={areaHelper.isSameTile(actionedTile.position, playerAreaPosition)}
                onClick={() => dispatch('moveToTile', actionedTile.position)}
            />
        </div>
    );
};

export default Actions;