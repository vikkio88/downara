import React from 'react';
import { useStoreon } from 'storeon/react';
import { Icon, Button } from 'components/common';
import { VIEWS } from 'lib/game';

import { Inventory } from './subViews';

const viewsMap = {
    [VIEWS.INVENTORY]: Inventory,
    [VIEWS.JOURNAL]: Inventory,
    [VIEWS.MAP]: Inventory,
    [VIEWS.PROFILE]: Inventory,
    [VIEWS.SETTINGS]: Inventory,
};

const View = () => {
    const { dispatch, ui: { view } } = useStoreon('ui');

    const Component = viewsMap[view];
    return (
        <>
            <div className="flex justify-end">
                <Button onClick={() => dispatch('changeView', null)}>
                    <Icon name={Icon.names.CROSS} />
                </Button>
            </div>

            <div
                className="flex-1 flex flex-col
            items-center justify-center shadow 
            overflow-y-auto
            ">
                <Component />
            </div>
        </>
    );
};

export default View;