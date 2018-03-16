import {
  FETCH_JOBS
} from '../constants';

const initialState = {
  results: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    default:
      return state;
  }
};
