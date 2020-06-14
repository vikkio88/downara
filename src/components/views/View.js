import React from 'react';
import { useStoreon } from 'storeon/react';
import { CloseRow } from 'components/common';
import { VIEWS } from 'lib/game';

import { Main, Inventory, Profile, Settings } from './subViews';

const viewsMap = {
    [VIEWS.MAIN]: Main,
    [VIEWS.INVENTORY]: Inventory,
    [VIEWS.PROFILE]: Profile,
    [VIEWS.SETTINGS]: Settings,
};

const View = () => {
    const { dispatch, ui: { view } } = useStoreon('ui');

    const Component = viewsMap[view];
    return (
        <>
            {view !== VIEWS.MAIN && <CloseRow onClose={() => dispatch('changeView', null)} />}
            <div className="flex-1 flex flex-col shadow overflow-y-auto">
                <Component />
            </div>
        </>
    );
};

export default View;