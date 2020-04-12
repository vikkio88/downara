import { createStoreon } from 'storeon';
import ui from './modules/ui';
import gameState from './modules/gameState';
import worldState from './modules/worldState';

const store = createStoreon([ui, gameState, worldState]);


export { store };