import React from 'react';
import { useStoreon } from 'storeon/react';

import EnvWindow from 'components/ui/EnvWindow';
import CommandBar from 'components/ui/CommandBar';

import { Area } from 'components/area';
import { Controls } from 'components/controls';

function Main() {
  const { gameState: { area } } = useStoreon('gameState');
  return (
    <div className="container h-screen mx-auto flex flex-col bg-gray-200">
      <EnvWindow>
        <Area label={area.label} />
      </EnvWindow>
      <CommandBar>
        <Controls />
      </CommandBar>
    </div>
  );
}

export default Main;
