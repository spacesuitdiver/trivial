import * as types from './types';

const initialState = {
  question: null,
  answers: null,
  fetching: false,
  refreshing: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_SUCCESS: {
      return {
        ...state,
        question: payload.question,
        answers: payload.answers,
        refreshing: false,
      };
    }
    default: {
      return state;
    }
  }
};
