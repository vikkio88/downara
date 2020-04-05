import React from 'react';

import { Button } from 'components/common';

const CommandBar = () => {
    return (
        <div className="
        text-gray-700
        text-center
        bg-gray-400
        px-4 py-2 m-2 
        flex-1 flex flex-col 
        items-center justify-center"
        >
            <Button label="Some stuff I dont know" />
            <Button label="Jesus my god I would not if I were you" />
        </div>
    );
};

export default CommandBar;