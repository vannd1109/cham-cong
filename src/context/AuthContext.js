/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = ({username, password}) => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      axios
        .post('http://192.168.14.2:8080/api/login', {
          username,
          password,
        })
        .then(res => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          setUserToken(res.data.accessToken);

          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('userToken', res.data.accessToken);

          setIsLoading(false);

          console.log('User Token: ' + res.data.accessToken);
        })
        .catch(e => {
          console.log(`LOgin error ${e}`);
        });
      // setIsLoading(false);
      clearTimeout(timer);
    }, 2000);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
