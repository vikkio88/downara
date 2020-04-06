import React from 'react';
import { useStoreon } from 'storeon/react';

import { Button } from 'components/common';
import EnvWindow from 'components/ui/EnvWindow';
import CommandBar from 'components/ui/CommandBar';

import { DIRECTIONS } from 'lib/game';
import { map } from 'lib/game/models';

const { NORTH: n, SOUTH: s, EAST: e, WEST: w } = DIRECTIONS;
const directions = [n, s, e, w];

function Main() {
  const { dispatch, gameState } = useStoreon('gameState');
  const currentPosition = map[gameState.position];
  return (
    <div className="container h-screen mx-auto flex flex-col bg-gray-200">
      <EnvWindow>
        <h1>{currentPosition.label}</h1>
      </EnvWindow>
      <CommandBar>
        {directions.map(d => (
          <Button
            key={d}
            label={d}
            onClick={() => { dispatch('move', d) }}
            disabled={currentPosition[d] == undefined}
          />
        ))}
      </CommandBar>
    </div>
  );
}

export default Main;
