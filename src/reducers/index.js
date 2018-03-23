import { combineReducers } from 'redux'
import playerReducer from './reducer_player'
import mapReducer from './reducer_map'
import enemyReducer from './reducer_enemy'

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  enemy: enemyReducer,
});

export default rootReducer;
