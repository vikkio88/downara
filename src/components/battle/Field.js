import React from 'react';
import { useStoreon } from 'storeon/react';


import { range } from 'lib';
import { Button } from 'components/common';
import { areaHelper } from 'lib/game';

const SIZE = 4;

const FACING = {
    UP: 'face_up',
    DOWN: 'face_down',
    RIGHT: 'face_right',
    LEFT: 'face_left',
};

const FACING_DIRECTIONS = {
    [FACING.UP]: 'transform rotate-270',
    [FACING.DOWN]: 'transform rotate-90',
    [FACING.RIGHT]: '',
    [FACING.LEFT]: 'transform rotate-180',
};

const Tile = ({
    position,
    terrain = "grass_4",
    object = null,
    blocked = false,
}) => {
    const { dispatch } = useStoreon('battle');
    // test to exit battle if clicking bottom right tile
    const func = areaHelper.isSameTile({ i: 3, j: 3 }, position)
        ? () => dispatch('toggleFightingTest') : () => dispatch('battle:clickTile', position);

    const { facing = null, asset = null } = (object || {});
    return (
        <Button
            secondary
            rounded={false}
            className="flex-1 flex items-center justify-center m-0"
            style={{ 'background': `url(assets/tiles/${terrain}.png)` }}
            disabled={blocked}
            onClick={func}
        >
            {object && <img src={`assets/battle/${asset}.png`} className={facing ? FACING_DIRECTIONS[facing] : ''} />}
        </Button>
    );
}

const Field = () => {
    return (
        <div className="flex-1 flex flex-col items-stretch">
            {range(0, SIZE).map((_, i) => (
                <div key={`i-${i}`} className="flex-1 flex flex-row items-stretch">
                    {range(0, SIZE).map((_, j) => {
                        let object = null;
                        if (i === 1 && j === 0) {
                            object = { asset: 'man_up' };
                        }

                        if (i === 1 && j === 3) {
                            object = { asset: 'man_up2', facing: FACING.LEFT };
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

export default Field;