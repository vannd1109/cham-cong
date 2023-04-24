/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {login} = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              width: '100%',
              height: 300,
            }}
            source={require('../assets/images/login.jpg')}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 24,
            fontWeight: '500',
            color: '#333',
            marginBottom: 20,
            marginTop: 20,
          }}>
          Đăng nhập
        </Text>

        <InputField
          label={'ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <InputField
          label={'Mật khẩu'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          fieldButtonLabel={'Quên mật khẩu?'}
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <CustomButton
          label={'Đăng nhập'}
          onPress={() => {
            login({username, password});
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
