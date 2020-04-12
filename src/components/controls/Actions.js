import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import { ACTIONS_LABELS, npcs } from 'downara';
import { ACTIONS, areaHelper } from 'lib/game';

const Actions = () => {
    const { dispatch, gameState: { player, actionedTile, worldPosition } } = useStoreon('gameState');
    const { worldState: { objects } } = useStoreon('worldState');
    const { areaPosition: playerAreaPosition } = player;
    const areaObjects = objects[worldPosition];
    const tileObject = areaHelper.getTileContent(actionedTile.position, actionedTile, areaObjects, npcs);
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
                onClick={() => dispatch('examine', tileObject)}
            />
        </div>
    );
};

export default Actions;