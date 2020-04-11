import React from 'react';
import { useStoreon } from 'storeon/react';

import { range, randomizer } from 'lib';
import { Button } from 'components/common';
import { AREA } from 'downara';
import areas from 'downara/areas';
import { areaHelper } from 'lib/game';

const Tile = ({
    label = " ",
    terrain = "grass_4",
    object = "house_3",
    player = false,
    actionable = false,
    position = null
}) => {
    const { dispatch } = useStoreon('gameState');
    return (
        <Button
            secondary
            noMargin
            className="flex-1 flex items-center justify-center m-0"
            style={{
                'background': `
                    ${player ? `no-repeat
                    url(assets/objects/knight_1.png),` : ''
                    }
                    ${object ? `no-repeat center
                    url(assets/objects/${object}.png),` : ''
                    } 
                    url(assets/tiles/${terrain}.png)
                `
            }}
            disabled={!actionable}
            onClick={() => dispatch('actioned', position)}
        />
    );
}

const Area = ({ label }) => {
    const { gameState: { player, worldPosition } } = useStoreon('gameState');
    const { areaPosition: playerAreaPosition } = player;
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
                            <Tile
                                key={`j-${j}`}
                                {...areas[worldPosition][i][j]}
                                player={areaHelper.isPlayerInTile(playerAreaPosition, i, j)}
                                actionable={areaHelper.isTileActionable(playerAreaPosition, i, j)}
                                position={{ i, j }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Area;