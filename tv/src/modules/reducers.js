import { combineReducers } from 'redux';
import { reducer as websocket } from '../modules/websocket';
import { reducer as category } from '../modules/category';

export default combineReducers({
  websocket,
  category,
});
