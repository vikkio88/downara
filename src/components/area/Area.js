import React from 'react';
import { useStoreon } from 'storeon/react';

import { range } from 'lib';
import { Button } from 'components/common';
import { AREA, interactables } from 'downara';
import areas from 'downara/areas';
import { areaHelper } from 'lib/game';

const Tile = ({
    terrain = "grass_4",
    object = null,
    blocked = false,
    link = false,
    player = false,
    actionable = false,
    position = null,
    flag = null
}) => {
    const { dispatch } = useStoreon();
    return (
        <Button
            secondary
            rounded={false}
            noMargin
            className="flex-1 flex items-center justify-center m-0"
            style={{
                'background': `
                    ${flag ? `no-repeat top right
                    url(assets/flags/flag_red.png),` : ''
                    }
                    ${player ? `no-repeat
                    url(assets/objects/main/${player.icon}.png),` : ''
                    }
                    ${object ? `no-repeat center
                    url(assets/objects/${object.object}.png),` : ''
                    } 
                    url(assets/tiles/${terrain}.png)
                `
            }}
            disabled={blocked || !actionable}
            onClick={() => dispatch('actioned', position)}
        />
    );
}

const Area = () => {
    const {
        gameState: { player, worldPosition, area },
        worldState: { objects, flags }
    } = useStoreon('gameState', 'worldState');
    const { areaPosition: playerAreaPosition } = player;
    const areaObjects = objects[worldPosition];
    return (
        <>
            <h1>{area.label}</h1>
            <div
                className="flex-1 flex flex-col items-stretch"
            >
                {range(0, AREA.size.y).map((_, i) => (
                    <div
                        key={`i-${i}`}
                        className="flex-1 flex flex-row items-stretch"
                    >
                        {range(0, AREA.size.x).map((_, j) => {
                            const tileConfig = areaHelper.getAreaTileConfig(
                                { worldPosition, actionedTile: { position: { i, j } } },
                                areas
                            );
                            const object = areaHelper.getTileContent({ i, j }, tileConfig, areaObjects, interactables, objects.config);
                            return (
                                <Tile
                                    key={`j-${j}`}
                                    {...tileConfig}
                                    object={object}
                                    player={areaHelper.isPlayerInTile(playerAreaPosition, i, j) && player}
                                    actionable={areaHelper.isTileActionable(playerAreaPosition, i, j)}
                                    position={{ i, j }}
                                    flag={areaHelper.getFlag({ i, j }, flags[worldPosition])}
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