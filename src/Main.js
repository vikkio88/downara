import React from 'react';
import { useStoreon } from 'storeon/react';

import EnvWindow from 'components/ui/EnvWindow';
import CommandBar from 'components/ui/CommandBar';

import { Controls } from 'components/controls';

function Main() {
  const { gameState: { status, area } } = useStoreon('gameState');
  return (
    <div className="container h-screen mx-auto flex flex-col bg-gray-200">
      <EnvWindow>
        <h1>{status}</h1>
        <h1>{area.label}</h1>
      </EnvWindow>
      <CommandBar>
        <Controls />
      </CommandBar>
    </div>
  );
}

export default Main;
