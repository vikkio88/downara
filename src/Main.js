import React from "react";
import { useStoreon } from "storeon/react";
import { STATUSES } from "lib/game";

import Transition from "components/ui/Transition";
import EnvWindow from "components/ui/EnvWindow";
import CommandBar from "components/ui/CommandBar";

import { Area } from "components/area";
import { Field, Controls as BattleControls } from "components/battle";
import { View } from "components/views";
import { Container } from "components/dialogues";
import { Controls as IdleControls } from "components/controls";

function Main() {
  const {
    gameState: { status, player },
    ui: { view, transition },
  } = useStoreon("gameState", "ui");

  const Controls = status === STATUSES.FIGHTING ? BattleControls : IdleControls;

  console.log('player post', player.areaPosition);
  if (transition) {
    return <Transition message={transition.message} />;
  }

  return (
    <>
      {view && <View />}
      {!view && (
        <>
          <EnvWindow>
            {/*status === STATUSES.FIGHTING && <Field />*/}
            {/*status === STATUSES.IDLE && <Area />*/}
            {status === STATUSES.SPEAKING && <Container />}
          </EnvWindow>
          <CommandBar>
            <Controls />
          </CommandBar>
        </>
      )}
    </>
  );
}

export default Main;
