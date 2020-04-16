import React from 'react';
import { useStoreon } from 'storeon/react';
import { STATUSES } from 'lib/game';

import EnvWindow from 'components/ui/EnvWindow';
import CommandBar from 'components/ui/CommandBar';

import { Area } from 'components/area';
import { View } from 'components/views';
import { Container } from 'components/dialogues';
import { Controls } from 'components/controls';

function Main() {
  const { gameState: { status } } = useStoreon('gameState');
  const { ui: { view } } = useStoreon('ui');

  return (
    <div className="container h-screen mx-auto flex flex-col bg-gray-200">
      {view && <View />}
      {!view && (
        <>
          <EnvWindow>
            {status === STATUSES.IDLE && <Area />}
            {status === STATUSES.SPEAKING && <Container />}
          </EnvWindow>
          <CommandBar>
            <Controls />
          </CommandBar>
        </>
      )}
    </div>
  );
}

export default Main;
