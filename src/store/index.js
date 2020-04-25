import { createStoreon } from 'storeon';
import ui from './modules/ui';
import dialogue from './modules/dialogue';
import gameState from './modules/gameState';
import worldState from './modules/worldState';
import battle from './modules/battle';

const store = createStoreon([ui, dialogue, gameState, worldState, battle]);


export { store };