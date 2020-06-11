import React from 'react';
import { useStoreon } from 'storeon/react';
import { CloseRow } from 'components/common';
import { VIEWS } from 'lib/game';

import { Inventory, Journal, Map, Profile, Settings } from './subViews';

const viewsMap = {
    [VIEWS.INVENTORY]: Inventory,
    [VIEWS.JOURNAL]: Journal,
    [VIEWS.MAP]: Map,
    [VIEWS.PROFILE]: Profile,
    [VIEWS.SETTINGS]: Settings,
};

const View = () => {
    const { dispatch, ui: { view } } = useStoreon('ui');

    const Component = viewsMap[view];
    return (
        <>
            <CloseRow onClose={()=> dispatch('changeView', null)} />
            <div className="flex-1 flex flex-col shadow overflow-y-auto">
                <Component />
            </div>
        </>
    );
};

export default View;