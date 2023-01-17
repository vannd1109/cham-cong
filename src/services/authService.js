/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line no-unused-vars
const logIn = async user => {
  const {username, password} = user;
  if (username.value === '03492' && password.value === '123456') {
    AsyncStorage.setItem('user', JSON.stringify(user));
    return {
      status: 'success',
      message: 'You are redirecting to home page',
      user: username,
    };
  }
};
const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: 'success',
    message: 'You are logged out',
  };
};
export default {
  logIn,
  logOut,
};
