import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';

const Message = () => {
    const { dispatch, ui: { message } } = useStoreon('ui');
    return (
        <div className="flex flex-col min-w-full">
            <div className="flex flex-row 
                items-center justify-center 
                bg-gray-200 shadow w-auto h-auto p-5"
            >
                {message}
            </div>
            <div className="flex flex-row justify-end">
                <Button
                    noPadding
                    onClick={() => dispatch('clearMessage')}
                >
                    Close
                </Button>
            </div>
        </div>
    )
};

export default Message;