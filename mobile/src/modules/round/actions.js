import { Constants } from 'expo';
import * as types from './types';
import { send } from '../../websocket';

export const play = name => () => {
  const { deviceId } = Constants;

  send({
    resource: 'round',
    action: 'play',
    user: {
      deviceId,
      name,
    },
  });
};

export const answer = ({ answerIndex, mugshot }) => (dispatch) => {
  const { deviceId } = Constants;

  dispatch({ type: types.ANSWER });

  send({
    resource: 'round',
    action: 'answer',
    payload: {
      user: {
        deviceId,
      },
      mugshot,
      answerIndex,
    },
  });
};
