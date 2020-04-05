import React from 'react';

import EnvWindow from 'components/ui/EnvWindow';
import CommandBar from 'components/ui/CommandBar';

function Main() {
  return (
    <div className="container h-screen mx-auto flex flex-col bg-gray-200">
      <EnvWindow />
      <CommandBar />      
    </div>
  );
}

export default Main;
