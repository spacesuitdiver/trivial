import * as types from './types';

const initialState = {
  question: null,
  players: [],
};

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.NEXT_QUESTION: {
    return {
      ...state,
      question: payload.question,
      players: sortPlayers(payload.players),
    };
  }
  case types.PLAY: {
    return {
      ...state,
      players: sortPlayers(payload.players),
    };
  }
  case types.ANSWER: {
    return {
      ...state,
      players: sortPlayers(payload.players),
    };
  }
  default: {
    return state;
  }
  }
};
