import * as types from './types';
import { send } from '../../websocket';

const joinStarted = () => ({ type: types.JOIN_STARTED });

export const join = name => (dispatch) => {
  dispatch(joinStarted());
  send({
  	resource: 'round',
  	action: 'join',
  	user: {
  		name,
  	},
  });
};
