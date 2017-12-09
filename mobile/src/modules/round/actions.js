import { Constants } from 'expo';
import * as types from './types';
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

export const answer = ({ answerIndex }) => (dispatch) => {
  const { deviceId } = Constants;

  dispatch({ type: types.ANSWER });

  send({
    resource: 'round',
    action: 'answer',
    user: {
      deviceId,
    },
    answerIndex,
  });
};
