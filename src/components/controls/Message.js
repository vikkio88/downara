import React from 'react';

import { Icon } from 'components/common';
import { MESSAGE_TYPES } from 'lib/game';
const typeClasses = {
    [MESSAGE_TYPES.INFO]: {
        wrapper: 'bg-blue-100 border-blue-500 text-blue-700',
        icon: 'text-blue-500'
    },
    [MESSAGE_TYPES.ERROR]: {
        wrapper: 'bg-red-100 border border-red-400 text-red-700',
        icon: 'text-red-500'
    }
};

const Message = ({ message, type, onDismiss = () => { } }) => {
    const { wrapper, icon } = typeClasses[type] || typeClasses[MESSAGE_TYPES.INFO];
    return (
        <div className={`border-t border-b px-4 py-3 rounded relative min-w-full ${wrapper}`} role="alert">
            <span className="block sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <Icon
                    name={Icon.names.CROSS}
                    className={`${icon}`}
                    role="button"
                    onClick={onDismiss}
                />
            </span>
        </div>
    );
};

export default Message;