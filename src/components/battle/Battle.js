import React from 'react';
import { useStoreon } from 'storeon/react';


import { range } from 'lib';
import { Button } from 'components/common';
import { areaHelper } from 'lib/game';

const SIZE = 4;

const Tile = ({
    position,
    terrain = "grass_4",
    object = null,
    blocked = false,
}) => {
    const { dispatch } = useStoreon('gameState');
    const func = areaHelper.isSameTile({ i: 3, j: 3 }, position)
        ? () => dispatch('toggleFightingTest') : () => console.log(position);
    return (
        <Button
            secondary
            rounded={false}
            className="flex-1 flex items-center justify-center m-0"
            style={{ 'background': `url(assets/tiles/${terrain}.png)` }}
            disabled={blocked}
            onClick={func}
        >
            {object && <img src={`assets/battle/${object}.png`} />}
        </Button>
    );
}

const Battle = () => {
    return (
        <div className="flex-1 flex flex-col items-stretch">
            {range(0, SIZE).map((_, i) => (
                <div key={`i-${i}`} className="flex-1 flex flex-row items-stretch">
                    {range(0, SIZE).map((_, j) => {
                        let object = null;
                        if (i === 1 && j === 0) {
                            object = 'man_up';
                        }

                        if (i === 1 && j === 3) {
                            object = 'man_up2';
                        }

                        return (
                            <Tile
                                object={object}
                                key={`j-${j}`}
                                position={{ i, j }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Battle;