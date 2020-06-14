import React from "react";
import { useStoreon } from "storeon/react";
import { STATUSES } from "lib/game";

import Transition from "components/ui/Transition";
import CommandBar from "components/ui/CommandBar";

import { Controls as BattleControls } from "components/battle";
import { View } from "components/views";
import { Controls as IdleControls } from "components/controls";

function Main() {
  const {
    gameState: { status },
    ui: { view, transition },
  } = useStoreon("gameState", "ui");

  const Controls = status === STATUSES.FIGHTING ? BattleControls : IdleControls;
  if (transition) {
    return <Transition message={transition.message} />;
  }

  return (
    <>
      {view && <View />}
      {!view && (
        <>
          <CommandBar>
            <Controls />
          </CommandBar>
        </>
      )}
    </>
  );
}

export default Main;
