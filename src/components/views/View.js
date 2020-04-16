import React from 'react';
import { useStoreon } from 'storeon/react';
import { Icon, Button } from 'components/common';

const View = () => {
    const { dispatch, ui: { view } } = useStoreon('ui');
    return (
        <>
            <div className="flex justify-end">
                <Button onClick={() => dispatch('changeView', null)}>
                    <Icon name={Icon.names.CROSS} />
                </Button>
            </div>

            <div
                className="flex-1 flex flex-col
            items-center bg-gray-300 shadow 
            overflow-y-auto justify-center
            ">
                <h1>{view}</h1>
            </div>
        </>
    );
};

export default View;