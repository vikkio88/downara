import React from 'react';
import { useStoreon } from 'storeon/react';

import { range } from 'lib';
import { Button } from 'components/common';
import { AREA, npcs } from 'downara';
import areas from 'downara/areas';
import { areaHelper } from 'lib/game';

const Tile = ({
    label = " ",
    terrain = "grass_4",
    object = null,
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
    const { worldState: { objects } } = useStoreon('worldState');
    const { areaPosition: playerAreaPosition } = player;
    const areaObjects = objects[worldPosition];
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
                        {range(0, AREA.size.x).map((_, j) => {
                            const tileConfig = areas[worldPosition][i][j];
                            const object = areaHelper.getObject({ i, j }, tileConfig, areaObjects, npcs);
                            return (
                                <Tile
                                    key={`j-${j}`}
                                    {...tileConfig}
                                    object={object}
                                    player={areaHelper.isPlayerInTile(playerAreaPosition, i, j)}
                                    actionable={areaHelper.isTileActionable(playerAreaPosition, i, j)}
                                    position={{ i, j }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Area;