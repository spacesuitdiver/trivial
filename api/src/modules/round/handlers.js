import * as TriviaApi from '../../apis/opentdb';
import logger from '../../logger';

let players = [];
const moderators = [];

let currentQuestion = null;

export const play = (event) => {
  const { ws, user } = event;
  const player = {
    answerPhoto: 'http://thecatapi.com/api/images/get?format=src&type=gif',
    ...user,
    score: 0,
    ws: event.ws,
  };

  // add user to round
  players.push(player);

  const payload = {
    players: players.map(({ ws, ...rest }) => ({
      ...rest,
    })),
  };

  // notify moderators of new user
  moderators.forEach((c) => {
    c.ws.send(JSON.stringify({
      resource: 'round',
      action: 'PLAY',
      payload,
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
    currentQuestion = question;

    const payload = {
      currentQuestion,
      players: players.map(({ ws, ...rest }) => ({
        ...rest,
      })),
    };

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

export const answer = ({ user, answerIndex }) => {
  if (answerIndex === currentQuestion.answerIndex) {
    players = players.map(oldPlayer => ({
      ...oldPlayer,
      score: oldPlayer.deviceId === user.deviceId ? oldPlayer.score + 1 : oldPlayer.score,
    }));
  }

  const payload = {
    players: players.map(({ ws, ...rest }) => ({
      ...rest,
    })),
  };

  moderators.forEach((client) => {
    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'ANSWER',
      payload,
    }));
  });
};
