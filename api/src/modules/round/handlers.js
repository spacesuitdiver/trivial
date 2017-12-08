import * as TriviaApi from '../../apis/opentdb';
import logger from '../../logger';

const players = [];
const moderators = [];

export const play = (event) => {
  const { ws, user } = event;
  const client = { ws, user };

  // add user to round
  players.push(client);

  // notify moderators of new user
  moderators.forEach((c) => {
    c.ws.send(JSON.stringify({
      resource: 'round',
      action: 'PLAY',
      user,
    }));
  });
};

export const moderate = (event) => {
  const { ws, user } = event;
  const client = { ws, user };

  moderators.push(client);
};

export const nextQuestion = () => {
  TriviaApi.fetchQuestion()
  .then((question) => {
    const payload = { question };

    players.forEach((client) => {
      if (client.ws.readyState !== 1) return; // guard against nonready clients

      client.ws.send(JSON.stringify({
        resource: 'round',
        action: 'NEXT_QUESTION',
        payload,
      }));
    });

    moderators.forEach((client) => {
      if (client.ws.readyState !== 1) return; // guard against nonready clients

      client.ws.send(JSON.stringify({
        resource: 'round',
        action: 'NEXT_QUESTION',
        payload,
      }));
    });
  });
};

export const answer = (event) => {
  const { user, answerIndex } = event;
  const payload = { user, answerIndex };

  moderators.forEach((client) => {
    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'ANSWER',
      payload,
    }));
  });
};
