import React from 'react';

const CommandBar = ({ children, col = false, row = true }) => {
    return (
        <div className={`
        text-gray-700 text-center
        bg-gray-400
        m-2 flex-1 flex`}
        >
            {children}
        </div>
    );
};

export default CommandBar;