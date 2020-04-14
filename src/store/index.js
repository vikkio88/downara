import { createStoreon } from 'storeon';
import ui from './modules/ui';
import dialogue from './modules/dialogue';
import gameState from './modules/gameState';
import worldState from './modules/worldState';

const store = createStoreon([ui, dialogue, gameState, worldState]);


export { store };