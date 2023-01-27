/* eslint-disable prettier/prettier */
import React from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {theme} from '../core/theme';

const image = {uri: 'https://img.freepik.com/free-photo/chinese-new-year-concept_23-2148738449.jpg?size=626&ext=jpg&ga=GA1.1.1219745364.1673400153&semt=ais'};

export default function Background({children}) {
  return (
    <ImageBackground
      source={image}
      resizeMode="stretch"
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
