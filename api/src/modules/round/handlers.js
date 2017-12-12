import * as TriviaApi from '../../apis/opentdb';
import store from '../../store';

export const play = (event) => {
  const { ws, user: newPlayer } = event;

  // add user to round if not already playing
  if (!store.players.some(({ deviceId }) => deviceId === newPlayer.deviceId)) {
    // initialize a new user
    store.players.push({
      mugshot: null,
      ...newPlayer,
      score: 0,
      status: 'joined', // joined, answering, answered
      ws,
    });
  } else {
    // update existing user's if already playing
    store.players = store.players.map((player) => {
      if (player.deviceId === newPlayer.deviceId) {
        return {
          ...player,
          ...newPlayer,
          score: player.score,  // keep score
          ws, // new connection
        };
      }
      return player;
    });
  }

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

export const answer = ({ payload: { user, answerIndex, mugshot } }) => {
  // update the player mugshot and score in the store
  store.players = store.players.map((player) => {
    if (player.deviceId === user.deviceId) {
      return {
        ...player,
        ...user,
        mugshot,
        status: 'answered',
        score: answerIndex === store.currentQuestion.answerIndex ?
          player.score + 1 :
          player.score,
      };
    }
    return player;
  });

  // send players to moderators
  const payload = {
    players: store.players.map(({ ws, ...rest }) => rest),
  };

  store.moderators.forEach((client) => {
    if (client.ws.readyState !== 1) return; // guard against nonready clients

    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'ANSWER',
      payload,
    }));
  });
};

export const moderate = (event) => {
  const { ws, user } = event;
  const newModerator = { ws, user };

  // add moderator to round if not already moderating
  if (!store.players.some(({ deviceId }) => deviceId === newModerator.deviceId)) {
    store.moderators.push(newModerator);
  } else {
    // update existing moderators's ws if already playing
    store.moderators = store.moderators.map((moderator) => {
      if (moderator.deviceId === newModerator.deviceId) {
        return {
          ...newModerator,
          ws, // new connection
        };
      }
      return moderator;
    });
  }

  // progress the question
  nextQuestion();
};


export const nextQuestion = () => {
  // fetch a new question, as if we needed this comment
  TriviaApi.fetchQuestion()
  .then((question) => {
    // store the question in the store, ehem again as if we need this comment
    store.currentQuestion = question;

    // send question to players
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
    const players = store.players.map(({ ws, ...player }) => ({
      ...player,
      status: 'answering',
      mugshot: null,
    }));

    const payloadForModerators = {
      question,
      players,
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
