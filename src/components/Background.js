/* eslint-disable prettier/prettier */
import React from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {theme} from '../core/theme';

const image = {uri: 'https://as1.ftcdn.net/v2/jpg/02/81/74/34/1000_F_281743427_lPuHFlCJdiWjWfd1u5YPSUQ4tfSgHtJs.jpg'};

export default function Background({children}) {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
