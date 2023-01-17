import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from './../../actions/auth';
import {theme} from '../../core/theme';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({setIsLogIn}) => {
  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state);
  const onLogin = () => {
    let user = {
      username: username,
      password: password,
    };

    dispatch(login(user))
      .then(response => {
        if (response.status == 'success') {
          // AsyncStorage.getItem('user').then(value => console.log(value));
          setIsLogIn(isLoggedIn);
        }
      })
      .catch(error => {
        // navigation.replace("Login");
      });
  };
  return (
    <Background>
      <Header>Sen Vàng Việt Nam</Header>
      <TextInput
        label="Tên đăng nhập"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View> */}
      <Button mode="contained" onPress={() => onLogin()}>
        Đăng nhập
      </Button>
    </Background>
  );
};
export default Login;
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
