import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';

import { Button, Icon } from 'components/common';
import { ACTIONS_LABELS } from 'downara';
import { ACTIONS, VIEWS } from 'lib/game';

const SecondaryMenu = ({ showMenu, setShowMenu, dispatch }) => {
    return (
        <div>
            <Button
                className="flex-1"
                secondary
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
};

const Actions = () => {
    const { dispatch, ui: { notification } } = useStoreon('ui');
    const [showMenu, setShowMenu] = useState(false);
    if (showMenu) {
        const props = { showMenu, setShowMenu, dispatch };
        return <SecondaryMenu {...props} />;
    }

    return (
        <div>
            <Button
                className="flex-1"
                notification={Boolean(notification)}
                onClick={() => setShowMenu(!showMenu)}
            >
                <Icon name={Icon.names.MENU} />
            </Button>

            <Button
                className="flex-1"
                onClick={() => dispatch('interact')}
            >
                <Icon name={Icon.names.BOLT} title={ACTIONS_LABELS[ACTIONS.INTERACT]} />
            </Button>
        </div>
    );
};

export default Actions;