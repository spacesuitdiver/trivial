import { combineReducers } from 'redux';
import { reducer as websocket } from '../modules/websocket';

export default combineReducers({
  websocket,
});
