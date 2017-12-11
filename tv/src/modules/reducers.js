import { combineReducers } from 'redux';
import { reducer as websocket } from '../modules/websocket';
import { reducer as round } from '../modules/round';

export default combineReducers({
  websocket,
  round,
});
