import { combineReducers } from 'redux';
import { reducer as websocket } from '../modules/websocket';
import { reducer as category } from '../modules/category';
import { reducer as round } from '../modules/round';

export default combineReducers({
  websocket,
  category,
  round,
});
