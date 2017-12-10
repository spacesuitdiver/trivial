import * as TriviaApi from '../../apis/opentdb';
import store from '../../store';

export const play = (event) => {
  const { ws, user } = event;
  const player = {
    mugshot: 'http://thecatapi.com/api/images/get?format=src&type=gif',
    ...user,
    score: 0,
    ws,
  };

  // add user to round
  store.players.push(player);

  const payload = {
    players: store.players.map(({ ws, ...rest }) => rest),
  };

  // notify moderators of new user
  store.moderators.forEach((c) => {
    if (c.ws.readyState !== 1) return; // guard against nonready clients

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

  store.moderators.push(client);
};

export const nextQuestion = () => {
  TriviaApi.fetchQuestion()
  .then((question) => {
    store.currentQuestion = question;

    const payload = {
      question,
      players: store.players.map(({ ws, ...rest }) => rest),
    };

    store.players.forEach((client) => {
      if (client.ws.readyState !== 1) return; // guard against nonready clients

      client.ws.send(JSON.stringify({
        resource: 'round',
        action: 'NEXT_QUESTION',
        payload,
      }));
    });

    store.moderators.forEach((client) => {
      if (client.ws.readyState !== 1) return; // guard against nonready clients

      client.ws.send(JSON.stringify({
        resource: 'round',
        action: 'NEXT_QUESTION',
        payload,
      }));
    });
  });
};

export const answer = ({ payload: { user, answerIndex, mugshot } }) => {
  if (answerIndex === store.currentQuestion.answerIndex) {
    store.players = store.players.map(oldPlayer => ({
      ...oldPlayer,
      mugshot,
      score: oldPlayer.deviceId === user.deviceId ? oldPlayer.score + 1 : oldPlayer.score,
    }));
  }

  const payload = {
    players: store.players.map(({ ws, ...rest }) => rest),
  };

  store.moderators.forEach((client) => {
    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'ANSWER',
      payload,
    }));
  });
};
