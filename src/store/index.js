import { createStoreon } from 'storeon';
import gameState from './modules/gameState';
import worldState from './modules/worldState';

const store = createStoreon([gameState, worldState]);


export { store };