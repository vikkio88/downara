import React from 'react';
import { range, randomizer } from 'lib';
import { Button } from 'components/common';
import { AREA } from 'downara';

const Tile = ({ label = " ", type = "grass_4", object = "house_3" }) => {
    object = randomizer.pickOne([null, null, null, 'house_1', 'houses_2', 'house_3', 'tree_1', 'mansion_2', 'mountain_2'])
    type = randomizer.pickOne(['grass_1', 'grass_2', 'grass_3', 'grass_4',])
    return (
        <Button
            secondary
            noMargin
            className="flex-1 flex items-center justify-center m-0"
            style={{
                'background': `
                    ${object ? `no-repeat center
                    url(assets/tiles/${object}.png),` : ''
                    } 
                    url(assets/tiles/${type}.png)
                `
            }}
        >

        </Button>
    );
}

const Area = ({ label }) => {
    return (
        <>
            <h1>{label}</h1>
            <div
                className="flex-1 flex flex-col items-stretch"
            >
                {range(0, AREA.size.y).map((_, i) => (
                    <div
                        key={`i-${i}`}
                        className="flex-1 flex flex-row items-stretch"
                    >
                        {range(0, AREA.size.x).map((_, j) => (
                            <Tile key={`j-${j}`} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Area;