import React from 'react';
const Progress = ({ percentage = 0, label = '', className = '', ...others }) => {
    const colour = percentage < 60 ? 'teal' : percentage < 85 ? 'orange' : 'red';
    return (
        <div className={`shadow bg-gray-300 mt-2 p-0 ${className}`} {...others} style={{ height: '20px' }}>
            <div className={`bg-${colour}-400 text-sm text-center text-white`} style={{ width: `${percentage}%` }}>{label}</div>
        </div>
    );
};

export default Progress;