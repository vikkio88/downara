import React from 'react';
import classnames from 'classnames';

const Button = ({
    children = null, label = "", className = '', disabled = false,
    primary = true, secondary = false, noPadding = false, noMargin = false,
    ...others }) => {
    className = classnames(
        className,
        {
            'opacity-50 cursor-not-allowed': disabled,
            'text-white bg-blue-500 hover:bg-blue-400 border border-blue-600': !secondary && primary,
            'text-blue-700 hover:bg-gray-400 border': secondary,
            'py-2 px-4': !noPadding,
            'm-0': noMargin,
            'm-1': !noMargin,
        }
    );
    return (
        <button
            className={`font-semibold rounded shadow ${className}`}
            disabled={disabled}
            {...others}
        >
            {children || label}
        </button>
    );
};

export default Button;