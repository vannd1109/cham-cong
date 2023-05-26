import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, paddingTop: 8, paddingBottom: 8 }}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#003868"
        />
      ) : (
        <TextInput
          placeholder={label}
          style={{ flex: 1, paddingVertical: 0, paddingTop: 8, paddingBottom: 8 }}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#003868"
          secureTextEntry={false}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: '#003868', fontWeight: '700' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
