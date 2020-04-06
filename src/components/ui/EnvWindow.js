import React from 'react';

const EnvWindow = ({ children }) => {
    return (
        <div className="
        text-gray-700
        text-center
        bg-gray-400
        min-h-twoThird 
        py-2 m-2 
        flex flex-col
        items-center justify-center
        ">
            {children}
        </div>
    );
};

export default EnvWindow;