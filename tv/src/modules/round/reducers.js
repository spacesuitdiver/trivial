import * as types from './types';

const initialState = {
  question: null,
  players: [],
};

export default (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
  case types.NEXT_QUESTION: {
    return {
      ...state,
      question: payload.question,
      players: payload.players,
    };
  }
  case types.PLAY: {
    return {
      ...state,
      players: payload.players,
    };
  }
  case types.ANSWER: {
    return {
      ...state,
      players: payload.players,
    };
  }
  default: {
    return state;
  }
  }
};
