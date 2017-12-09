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

export const answer = ({ answerIndex }) => () => {
  const { deviceId } = Constants;
console.log(answerIndex);
  send({
    resource: 'round',
    action: 'answer',
    user: {
      deviceId,
    },
    answerIndex,
  });
};
