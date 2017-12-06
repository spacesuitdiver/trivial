import * as types from './types';

const initialState = {
  question: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.NEXT_QUESTION: {
      return {
        ...state,
        question: payload.question,
      };
    }
    default: {
      return state;
    }
  }
};
