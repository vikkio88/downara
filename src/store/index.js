import { createStoreon } from 'storeon';
import gameState from './modules/gameState';

const store = createStoreon([gameState]);


export { store };