import { Constants } from 'expo';
import { send } from '../../websocket';

export const play = name => (dispatch, getState) => {
  const { deviceId } = Constants;

  if (getState().websocket.default.status === 'connected') {
    send({
      resource: 'round',
      action: 'play',
      user: {
        name,
        deviceId,
      },
    });
  } else {
    alert('Please wait to be connected.');
  }
};
