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

export const answer = ({ answerIndex, uri }) => (dispatch) => {
  const { deviceId } = Constants;

  dispatch({ type: types.ANSWER, payload: { answerIndex, uri } });

  const formData = new FormData();
  formData.append('mugshot', {
    uri,
    name: 'photo.jpeg',
    type: 'image/jpeg',
  });

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  fetch('http://leblancc-mbp:8080/mugshot', options)
  .then(res => res.json())
  .then(({ url }) => {
    dispatch({ type: types.ANSWER_SUCCESS });
    send({
      resource: 'round',
      action: 'answer',
      payload: {
        user: {
          deviceId,
        },
        mugshot: url,
        answerIndex,
      },
    });
  })
  .catch(() => dispatch({ type: types.ANSWER_FAILED }));
};
