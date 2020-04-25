import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';

import { Button, Icon } from 'components/common';
import { ACTIONS_LABELS } from 'downara';
import { ACTIONS, VIEWS, areaHelper } from 'lib/game';

const SecondaryMenu = ({ showMenu, isPlayerTile, setShowMenu, dispatch }) => {
    return (
        <div>
            <Button
                className="flex-1"
                secondary
                disabled={!isPlayerTile}
                onClick={() => setShowMenu(!showMenu)}
            >
                <Icon name={Icon.names.MENU} />
            </Button>
            <div>
                <Button className="flex-1" onClick={() => dispatch('changeView', VIEWS.INVENTORY)}>
                    <Icon name={Icon.names.BOX} />
                </Button>
                <Button className="flex-1" onClick={() => dispatch('changeView', VIEWS.JOURNAL)}>
                    <Icon name={Icon.names.BOOK} />
                </Button>
                <Button className="flex-1" onClick={() => dispatch('changeView', VIEWS.MAP)}>
                    <Icon name={Icon.names.MAP} />
                </Button>
                <Button className="flex-1" onClick={() => dispatch('changeView', VIEWS.PROFILE)}>
                    <Icon name={Icon.names.USER} />
                </Button>
                <Button className="flex-1" onClick={() => dispatch('changeView', VIEWS.SETTINGS)}>
                    <Icon name={Icon.names.COG} />
                </Button>
            </div>
        </div>
    );
}

const Actions = () => {
    const { dispatch, gameState: { player, actionedTile }, ui: { notification } } = useStoreon('gameState', 'ui');
    const { areaPosition: playerAreaPosition } = player;
    const isPlayerTile = areaHelper.isSameTile(actionedTile.position, playerAreaPosition);

    const [showMenu, setShowMenu] = useState(false);

    if (showMenu) {
        const props = { showMenu, isPlayerTile, setShowMenu, dispatch }
        return <SecondaryMenu {...props} />
    }

    return (
        <div>
            <Button
                className="flex-1"
                disabled={!isPlayerTile}
                notification={Boolean(notification)}
                onClick={() => setShowMenu(!showMenu)}
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