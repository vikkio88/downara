import React from 'react';
import classnames from 'classnames';

const Button = ({
    children = null, label = "", className = '', disabled = false,
    primary = true, secondary = false, noPadding = false, noMargin = false,
    notification = false, rounded = true,
    ...others }) => {
    className = classnames(
        className,
        {
            'rounded': rounded,
            'opacity-50 cursor-not-allowed': disabled && !secondary,
            'opacity-75 cursor-not-allowed': disabled && secondary,
            'text-white bg-blue-500 hover:bg-blue-400 border border-blue-600': !secondary && primary,
            'text-blue-700 hover:bg-gray-400': secondary,
            'py-2 px-4': !noPadding,
            'm-0': noMargin,
            'm-1': !noMargin,
        }
    );
    return (
        <button
            className={`font-semibold shadow ${className}`}
            style={{ position: 'relative', outline: 'none' }}
            disabled={disabled}
            {...others}
        >
            <>
                {notification && (
                    <span
                        className="rounded-full bg-red-500 uppercase px-2 py-2 text-xs font-bold mr-3"
                        style={{ position: 'absolute', top: '-4px', right: '-14px' }}
                    />
                )}
                {children || label}
            </>
        </button>
    );
};

export default Button;