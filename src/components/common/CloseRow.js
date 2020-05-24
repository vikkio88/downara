import React from 'react';

import Button from './Button';
import Icon from './Icon';


export default ({ onClose = () => { }, disabled = false }) => {
    return (
        <div className="flex justify-end bg-gray-400">
            <Button onClick={onClose} disabled={disabled}>
                <Icon name={Icon.names.CROSS} />
            </Button>
        </div>
    );
};