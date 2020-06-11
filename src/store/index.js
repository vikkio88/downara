import { createStoreon } from 'storeon';
import ui from './modules/ui';
import gameState from './modules/gameState';
import battle from './modules/battle';

const store = createStoreon([ui, gameState, battle]);


export { store };