import React from 'react';
import { useStoreon } from 'storeon/react';
import { STATUSES } from 'lib/game';

import EnvWindow from 'components/ui/EnvWindow';
import CommandBar from 'components/ui/CommandBar';

import { Area } from 'components/area';
import { Field, Controls as BattleControls } from 'components/battle';
import { View } from 'components/views';
import { Container } from 'components/dialogues';
import { Controls as IdleControls } from 'components/controls';

function Main() {
  const { gameState: { status } } = useStoreon('gameState');
  const { ui: { view } } = useStoreon('ui');

  const Controls = status === STATUSES.FIGHTING ? BattleControls : IdleControls;
  return (
    <div className="container h-screen mx-auto flex flex-col bg-gray-200">
      {view && <View />}
      {!view && (
        <>
          <EnvWindow>
            {status === STATUSES.FIGHTING && <Field />}
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
