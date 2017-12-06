const players = [];
const moderators = [];
const questions = [
  {
    text: 'Can haz cheeseburger?',
    answers: ['Yes!', 'No!'],
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
  currentQuestionIndex += currentQuestionIndex;

  players.forEach((client) => {
    const payload = {
      question: questions[currentQuestionIndex],
    };

    client.ws.send(JSON.stringify({
      resource: 'round',
      action: 'NEXT_QUESTION',
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
      action: 'ANSWER',
      payload,
    }));
  });
};
