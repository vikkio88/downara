import React from 'react';

const NAMES = {
    CROSS: 'cross',
    SEARCH: 'search',
    BOLT: 'bolt',
    MENU: 'menu',
};
// using zondicons http://www.zondicons.com/icons.html
const map = {
    [NAMES.CROSS]: 'M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z',
    [NAMES.SEARCH]: 'M12.9056439,14.3198574 C11.5509601,15.3729184 9.84871145,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,9.84871145 15.3729184,11.5509601 14.3198574,12.9056439 L19.6568542,18.2426407 L18.2426407,19.6568542 L12.9056439,14.3198574 Z M8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 Z',
    [NAMES.BOLT]: 'M13,8 L13,0 L3,12 L7,12 L7,20 L17,8 L13,8 Z',
    [NAMES.MENU]: 'M0,3 L20,3 L20,5 L0,5 L0,3 Z M0,9 L20,9 L20,11 L0,11 L0,9 Z M0,15 L20,15 L20,17 L0,17 L0,15 Z'
}

const Icon = ({ name, title = null, className = '', ...others }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`fill-current h-6 w-6 ${className}`}
            viewBox="0 0 20 20"
            {...others}
        >
            <title>{title || name}</title>
            <path d={map[name]} />
        </svg>
    )
};

Icon.names = NAMES;

export default Icon;