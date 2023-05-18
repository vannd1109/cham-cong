/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from '../context/AuthContext';
import {AppState} from 'react-native';

const AppNav = () => {
  const {userToken, logout} = useContext(AuthContext);

  useEffect(() => {
    if (AppState.currentState !== 'active') {
      logout();
    }
  }, [logout]);

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
