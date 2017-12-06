import logger from '../../logger';

const players = [];
const moderators = [];
const questions = [
  {
    text: 'Can haz cheeseburger?',
    answers: ['Yes!', 'No!'],
    answerIndex: 0,
  },
  {
    text: 'What is the meaning of life?',
    answers: ['27', '92', 'Fourty Two', 'I wish I knew...'],
    answerIndex: 0,
  },
];
let currentQuestionIndex = 0;

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
  players.forEach((client) => {
    if (client.ws.readyState !== 1) return; // guard against nonready clients

    const payload = {
      question: questions[currentQuestionIndex],
    };

    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'NEXT_QUESTION',
      payload,
    }));
  });

  currentQuestionIndex = currentQuestionIndex + 1;

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
