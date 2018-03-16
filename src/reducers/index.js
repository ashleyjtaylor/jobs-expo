import { combineReducers } from 'redux';
import auth from './AuthReducer';
import jobs from './JobsReducer';
import likes from './LikesReducer';

export default combineReducers({
  auth,
  jobs,
  likes
});
