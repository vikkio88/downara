import React from 'react';

const CommandBar = ({ children, col = false, row = true }) => {
    return (
        <div className={`
        text-gray-700
        text-center
        bg-gray-400
        px-4 py-2 m-2 
        flex-1 flex 
        ${col ? 'flex-col' : ''} 
        ${!col && row ? 'flex-row' : ''} 
        items-center justify-center
        `}
        >
            {children}
        </div>
    );
};

export default CommandBar;