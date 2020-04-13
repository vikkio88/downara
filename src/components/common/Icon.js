import React from 'react';

const NAMES = {
    CROSS: 'cross'
};

const map = {
    [NAMES.CROSS]: 'M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z'
}

const Icon = ({ name, className = '', ...others }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`fill-current h-6 w-6 ${className}`}
            viewBox="0 0 20 20"
            {...others}
        >
            <title>Close</title>
            <path d={map[name]} />
        </svg>
    )
}

Icon.names = NAMES;

export default Icon;