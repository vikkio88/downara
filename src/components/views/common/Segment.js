import React from 'react';


const Segment = ({ children, className = '', center = false, style = null, row = false }) => {
    const orientation = row ? 'row' : 'col';
    const centering = center ? 'center' : 'between';
    return (
        <div
            className={`border border-gray-400 bg-white rounded-b p-4 m-4 flex flex-${orientation} justify-${centering} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};


export default Segment;