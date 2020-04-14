import React from 'react';
import { Button, Icon } from 'components/common';
import { useStoreon } from 'storeon/react';

const Dialogue = () => {
    const { dispatch, dialogue: { currentLine, lines } } = useStoreon('dialogue');
    return (
        <div className={`flex-1 flex items-center justify-center`}>
            {
                lines[currentLine].replies.map((r, i) => (
                    <Button
                        key={`reply-${currentLine}-${i}`}
                        secondary
                        onClick={() => dispatch('reply', r)}
                    >
                        {r.message}
                    </Button>
                ))
            }
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