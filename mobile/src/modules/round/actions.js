import { Constants } from 'expo';
import { send } from '../../websocket';

export const play = name => () => {
  const { deviceId } = Constants;

  send({
    resource: 'round',
    action: 'play',
    user: {
      name,
      deviceId,
    },
  });
};
