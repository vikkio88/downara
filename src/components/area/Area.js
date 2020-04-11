import React from 'react';
import { range, randomizer } from 'lib';
import { Button } from 'components/common';
import { AREA } from 'downara';

const Tile = ({ label = " ", terrain = "grass_4", object = "house_3", player = false }) => {
    object = randomizer.chance(50) ? null : randomizer.pickOne(['house_1', 'man_1', 'house_3', 'tree_1', 'mansion_2', 'mountain_2'])
    terrain = randomizer.pickOne(['grass_1', 'sand_1'])
    return (
        <Button
            secondary
            noMargin
            className="flex-1 flex items-center justify-center m-0"
            style={{
                'background': `
                    ${player ? `no-repeat center
                    url(assets/objects/${object}.png),` : ''
                    }
                    ${object ? `no-repeat center
                    url(assets/objects/${object}.png),` : ''
                    } 
                    url(assets/tiles/${terrain}.png)
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
                            <Tile key={`j-${j}`} player={i === 2 && j === 2} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Area;