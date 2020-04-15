import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button, Icon } from 'components/common';
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
                disabled={!isPlayerTile}
                onClick={() => dispatch('examine')}
            >
                <Icon name={Icon.names.MENU} />
            </Button>

            <Button
                className="flex-1"
                disabled={!isPlayerTile}
                onClick={() => dispatch('examine')}
            >
                <Icon name={Icon.names.SEARCH} title={ACTIONS_LABELS[ACTIONS.EXAMINE]} />
            </Button>

            <Button
                className="flex-1"
                disabled={!isPlayerTile}
                onClick={() => dispatch('interact')}
            >
                <Icon name={Icon.names.BOLT} title={ACTIONS_LABELS[ACTIONS.INTERACT]} />
            </Button>
        </div>
    );
};

export default Actions;