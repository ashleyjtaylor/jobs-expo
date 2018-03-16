import { AsyncStorage } from 'react-native';

import {
  LOGOUT
} from '../constants';

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('fb_token');
  dispatch({ type: LOGOUT });
};
