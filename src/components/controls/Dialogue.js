import React from 'react';
//import { useStoreon } from 'storeon/react';
import { Button, Icon } from 'components/common';
import { useStoreon } from 'storeon/react';

const Dialogue = () => {
    const { dispatch } = useStoreon('gameState');
    return (
        <div className={`flex-1 flex items-center justify-center`}>
            <Button secondary>
                Not bad, my Dear!
            </Button>
            <Button
                secondary
                onClick={() => dispatch('stopDialogue')}
            >
                <Icon name={Icon.names.CROSS} />
            </Button>
        </div>
    );
};

export default Dialogue;