/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import {LOGIN_SUCCESS, LOGOUT} from './type';
import AuthService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = user => dispatch => {
  return AuthService.logIn(user).then(
    response => {
      if (response.status === 'success') {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {user: response.user},
        });
        Promise.resolve();
        return response;
      }
    },
    error => {
      const message = error.toString();
      Promise.reject();
      return message;
    },
  );
};
export const logout = () => dispatch => {
  return AuthService.logOut().then(response => {
    if (response.status === 'success') {
      dispatch({
        type: LOGOUT,
      });
      Promise.resolve();
      return response;
    }
  });
};

const user = AsyncStorage.getItem('user');

const initialState = user
  ? {isLoggedIn: true, user}
  : {isLoggedIn: false, user: null};
export default auth = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
