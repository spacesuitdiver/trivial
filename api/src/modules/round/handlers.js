import logger from '../../logger';

const players = [];
const moderators = [];
const questions = [
  {
    text: 'Can haz cheeseburger?',
    answers: ['Yes!', 'No!'],
    answerIndex: 0,
  },
];

export const play = (event) => {
  const { ws, user } = event;
  const client = { ws, user };

  // add user to round
  players.push(client);

  // notify moderators of new user
  moderators.forEach((c) => {
    c.ws.send(JSON.stringify({
      resource: 'round',
      action: 'play',
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
  players.forEach((client) => {
    const payload = {
      question: questions[0],
    };

    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'nextQuestion',
      payload,
    }));
  });
};

export const answer = (event) => {
  const { user, answerIndex } = event;
  const payload = { user, answerIndex };

  moderators.forEach((client) => {
    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'answer',
      payload,
    }));
  });
};

