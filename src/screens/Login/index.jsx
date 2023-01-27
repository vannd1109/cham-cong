import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch} from 'react-redux';
import {login} from './../../actions/auth';
import {theme} from '../../core/theme';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const _onChangeUsername = currentText => {
    if (!currentText) {
      setUsername({
        error: 'Không được để trống',
      });
    } else {
      setUsername({
        value: currentText,
        error: '',
      });
    }
  };

  const _onChangePass = currentText => {
    if (!currentText) {
      setPassword({
        error: 'Không được để trống',
      });
    } else {
      setPassword({
        value: currentText,
        error: '',
      });
    }
  };

  const onLogin = () => {
    setLoading(true);
    let user = {
      username: username,
      password: password,
    };

    const timer = setInterval(() => {
      dispatch(login(user))
        .then(response => {
          if (response.status == 'success') {
            navigation.navigate('CheckInOut');
            clearInterval(timer);
            setLoading(false);
            setIsValid(false);
            setUsername({
              value: '',
              error: '',
            });
            setPassword({
              value: '',
              error: '',
            });
          }
        })
        .catch(error => {
          setIsValid(true);
          setLoading(false);
          clearInterval(timer);
          setUsername({
            value: '',
            error: '',
          });
          setPassword({
            value: '',
            error: '',
          });
          navigation.navigate('LogIn');
        });
    }, 500);
  };
  return (
    <Background>
      <Header>Sen Vàng Việt Nam</Header>
      <Spinner
        visible={isLoading}
        textContent={'Chờ trong giây lát...'}
        textStyle={styles.spinnerTextStyle}
        indicatorStyler="red"
      />
      {!isLoading && (
        <>
          <TextInput
            label="Tên đăng nhập"
            returnKeyType="next"
            onChangeText={text => _onChangeUsername(text)}
            error={username.error}
            errorText={username.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Mật khẩu"
            returnKeyType="done"
            onChangeText={text => _onChangePass(text)}
            error={password.error}
            errorText={password.error}
            secureTextEntry
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity
            // onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={styles.forgot}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
          {isValid && (
            <View style={styles.error}>
              <Text style={styles.errorLabel}>
                Tên đăng nhập hoặc mật khẩu không đúng
              </Text>
            </View>
          )}

          <Button
            mode="contained"
            disabled={!Boolean(username.value) || !Boolean(password.value)}
            onPress={() => onLogin()}>
            Đăng nhập
          </Button>
        </>
      )}
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
  error: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  errorLabel: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.colors.error,
    marginBottom: 20,
    fontSize: 13,
    fontWeight: '600',
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  spinnerTextStyle: {
    fontSize: 14,
    color: '#fff'
  }
});
