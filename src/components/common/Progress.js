import React from 'react';
const Progress = ({ percentage = 0, label = '', className = '', colours = ['red', 'orange', 'teal'], noMargin = false, ...others }) => {
    const colour = percentage < 60 ? colours[0] : percentage < 85 ? colours[1] : colours[2];
    const margin = noMargin ? '' : 'mt-2';
    return (
        <div className={`shadow bg-gray-300 p-0 ${margin} ${className}`} {...others} style={{ height: '20px' }}>
            <div className={`bg-${colour}-400 text-sm text-center text-white`} style={{ width: `${percentage}%` }}>{label}</div>
        </div>
    );
};

export default Progress;