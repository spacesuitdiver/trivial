import * as types from './types';

const initialState = {
  status: 'disconnected',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.CONNECTING:
      return {
        ...state,
        status: 'connecting',
      };
    case types.DISCONNECTED:
      return {
        ...state,
        status: 'disconnected',
      };
    case types.CONNECTED:
      return {
        ...state,
        status: 'connected',
      };
    case types.ERROR:
      return {
        ...state,
        status: 'error',
      };
    default:
      return state;
  }
};
