import _ from 'lodash';

import {
  LIKE_JOB,
  CLEAR_LIKES
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case CLEAR_LIKES:
      return [];
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey');
    default:
      return state;
  }
};
