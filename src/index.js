import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';

import './assets/main.css';
import Main from './Main';
//import * as serviceWorker from './serviceWorker';
import { store } from 'store';


ReactDOM.render(
  <StoreContext.Provider value={store}>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </StoreContext.Provider>,
  document.getElementById('root')
);

//serviceWorker.unregister();
