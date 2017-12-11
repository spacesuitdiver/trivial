import * as TriviaApi from '../../apis/opentdb';
import store from '../../store';

export const play = (event) => {
  const { ws, user } = event;

  // initialize a new player
  const player = {
    mugshot: 'http://thecatapi.com/api/images/get?format=src&type=gif',
    ...user,
    score: 0,
    ws,
  };

  // add user to round
  store.players.push(player);

  // notify moderators of new user
  const payload = {
    players: store.players.map(({ ws, ...rest }) => rest),
  };

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

  // add moderator to round
  store.moderators.push(client);
};

export const nextQuestion = () => {
  // fetch a new question, as if we needed this comment
  TriviaApi.fetchQuestion()
  .then((question) => {
    // store the question in the store, ehem again as if we need this comment
    store.currentQuestion = question;

    // send question and players to players and moderators
    const payloadForPlayers = {
      question,
    };

    store.players.forEach((client) => {
      if (client.ws.readyState !== 1) return; // guard against nonready clients

      client.ws.send(JSON.stringify({
        resource: 'round',
        action: 'NEXT_QUESTION',
        payload: payloadForPlayers,
      }));
    });

    // send question and players to players and moderators
    const payloadForModerators = {
      question,
      players: store.players.map(({ ws, ...rest }) => rest),
    };

    store.moderators.forEach((client) => {
      if (client.ws.readyState !== 1) return; // guard against nonready clients

      client.ws.send(JSON.stringify({
        resource: 'round',
        action: 'NEXT_QUESTION',
        payload: payloadForModerators,
      }));
    });
  });
};

export const answer = ({ payload: { user, answerIndex, mugshot } }) => {
  // update the player mugshot and score in the store
  store.players = store.players.map(oldPlayer => ({
    ...oldPlayer,
    mugshot,
    score:
      answerIndex === store.currentQuestion.answerIndex &&
      oldPlayer.deviceId === user.deviceId ?
        oldPlayer.score + 1 :
        oldPlayer.score,
  }));

  // send players to moderators
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
