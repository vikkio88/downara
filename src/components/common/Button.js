import React from 'react';
import classnames from 'classnames';

const Button = ({
    label, className = '', disabled = false,
    noPadding = false, noBorder = false,
    ...others }) => {
    className = classnames(
        className,
        {
            'opacity-50 cursor-not-allowed': disabled,
            'py-2 px-4': !noPadding,
            'bg-blue-500 hover:bg-blue-400 border border-blue-600': !noBorder
        }
    );
    return (
        <button
            className={`
        text-white font-semibold m-1
        rounded shadow
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