import React from 'react';
import { LABELS } from 'downara';
import { Icon } from 'components/common';
import { useStoreon } from 'storeon/react';

const Line = ({ message, onClick = () => { } }) => {
    return (
        <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 py-0 sm:py-3 rounded relative min-w-full"
            role="button"
            onClick={onClick}
        >
            {message}
        </div>
    );
};

const Dialogue = () => {
    const { dispatch, dialogue: { currentLine, lines, waiting } } = useStoreon('dialogue');
    return (
        <div className={`flex-1 flex flex-col items-center justify-center overflow-y-auto`}>
            {!waiting &&
                <>
                    {lines[currentLine].replies.map((r, i) => (
                        <Line
                            key={`reply-${currentLine}-${i}`}
                            secondary
                            noPadding
                            onClick={() => dispatch('reply', r)}
                            message={r.message}
                        />
                    ))}
                </>
            }

            {!waiting && lines[currentLine].replies.length === 0 && (
                <>
                    {LABELS.NOTHING_TO_SAY}
                    <Icon
                        role="button" name={Icon.names.CROSS}
                        onClick={() => dispatch('stopDialogue')}
                        title={LABELS.CLOSE}
                    />
                </>
            )}
        </div>
    );
};

export default Dialogue;