import React from 'react';

import Button from './Button';
import Icon from './Icon';


export default ({ header = null, onClose = () => { }, disabled = false }) => {
    return (

        <div className="flex justify-center items-center bg-gray-400">
            <div className="flex justify-center items-center flex-1" >
                {header}
            </div>
            <div className="flex flex-2 justify-end">
                <Button onClick={onClose} disabled={disabled}>
                    <Icon name={Icon.names.CROSS} />
                </Button>
            </div>
        </div>
    );
};