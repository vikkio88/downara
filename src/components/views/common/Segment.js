import React from 'react';


const Segment = ({ children, className = '', center = false, row = false, spaced = true, ...others }) => {
    const orientation = row ? 'row' : 'col';
    const centering = center ? 'center' : 'between';
    const spacing = spaced ? 'm4' : '';
    return (
        <div
            className={`border border-gray-400 bg-white rounded-b p-4 ${spacing} flex flex-${orientation} justify-${centering} ${className}`}
            {...others}
        >
            {children}
        </div>
    );
};


export default Segment;