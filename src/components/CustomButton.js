/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress, disabled = false, bg}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: `${bg}`,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
