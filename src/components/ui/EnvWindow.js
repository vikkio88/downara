import React from 'react';

const EnvWindow = ({ children }) => {
    return (
        <div className="
        text-gray-700
        text-center
        min-h-twoThird 
        py-2 m-2 
        flex flex-col
        items-stretch
        ">
            {children}
        </div>
    );
};

export default EnvWindow;