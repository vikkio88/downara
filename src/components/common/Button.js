import React from 'react';
import classnames from 'classnames';

const Button = ({
    label, className = '', disabled = false,
    primary = true, secondary = false, noPadding = false,
    ...others }) => {
    className = classnames(
        className,
        {
            'opacity-50 cursor-not-allowed': disabled,
            'text-white bg-blue-500 hover:bg-blue-400 border border-blue-600': !secondary && primary,
            'text-blue-700 hover:bg-gray-400 border': secondary,
            'py-2 px-4': !noPadding,
        }
    );
    return (
        <button
            className={`font-semibold m-1 rounded shadow ${className}`}
            disabled={disabled}
            {...others}
        >
            {label}
        </button>
    );
};

export default Button;