import React from 'react';
import classnames from 'classnames';

const Button = ({ label, className = '', disabled = false, ...others }) => {
    className = classnames(className, { 'opacity-50 cursor-not-allowed': disabled })
    return (
        <button
            className={`
        bg-blue-500
        hover:bg-blue-400
        text-white font-bold 
        py-2 px-4 border-b-4 
        border-blue-700
        hover:border-blue-500 rounded
        ${className}`
            }
            disabled={disabled}
            {...others}
        >
            {label}
        </button>
    );
};

export default Button;