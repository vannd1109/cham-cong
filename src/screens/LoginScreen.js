/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
<<<<<<< HEAD
import InputField from '../components/InputField';
import {AuthContext} from '../context/AuthContext';
=======
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
>>>>>>> 09ff1d592d8005234977424af57c30d4e0c0e3cb

const LoginScreen = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
<<<<<<< HEAD
  const {login, isLoading} = useContext(AuthContext);
=======
  const { login, isLoading } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
>>>>>>> 09ff1d592d8005234977424af57c30d4e0c0e3cb
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
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
            fontSize: 20,
            fontWeight: '600',
            color: '#003868',
            marginTop: 20,
            textAlign: 'center',
          }}>
          Sen Vàng Việt Nam
        </Text>

        <InputField
          label={'SID'}
          icon={
            <Feather
              name="user"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={username}
          onChangeText={text => setUsername(text)}
          inputType="text"
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
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={{display: 'flex', alignItems: 'flex-end'}}>
          <Text
            style={{
              marginBottom: 16,
              fontSize: 12,
              textDecorationLine: 'underline',
              color: '#003868',
              paddingRight: 8,
            }}>
            Quên mật khẩu
          </Text>
        </View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              login({username, password});
            }}
            style={{
              backgroundColor: `${
                username && password ? '#003868' : '#a4b1bd'
              }`,
              padding: 20,
              paddingLeft: 32,
              paddingRight: 32,
              borderRadius: 4,
            }}>
            <Text style={{color: '#fff', textTransform: 'uppercase'}}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000555',
            bottom: 0,
          }}>
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{translateY: -50}, {translateX: -100}],
              width: '50%',
              alignItems: 'center',
              gap: 4,
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={'#fff'} />
              <Text style={{color: '#FFF', fontSize: 12, fontStyle: 'italic'}}>
                Đang đăng nhập...
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default LoginScreen;
