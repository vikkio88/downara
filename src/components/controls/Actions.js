import React from 'react';
import { Button } from 'components/common';
import { ACTIONS_LABELS } from 'downara';
import { ACTIONS } from 'lib/game';

const Actions = () => {
    return (
        <div>
            {Object.values(ACTIONS).map(a => <Button label={ACTIONS_LABELS[a]} className="flex-1" />)}
        </div>
    );
};

export default Actions;