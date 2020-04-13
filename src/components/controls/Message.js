import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button, Icon } from 'components/common';

const Message = () => {
    const { dispatch, ui: { message } } = useStoreon('ui');
    return (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded relative min-w-full" role="alert">
            <span className="block sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <Icon
                    name={Icon.names.CROSS}
                    className="h-6 w-6 text-blue-500"
                    role="button"
                    onClick={() => dispatch('clearMessage')}
                />
            </span>
        </div>
    )
};

export default Message;