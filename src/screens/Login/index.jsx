import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch} from 'react-redux';
import {login} from './../../actions/auth';
import Header from '../../components/Header';
import {Formik, Field, Form} from 'formik';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const navigation = useNavigation();

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
          // navigation.navigate('LogIn');
        });
    }, 2000);
  };

  return (
    <View>
      <View style={styles.formLogin}>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Image
            style={{width: 160, height: 60}}
            source={{
              uri: 'https://cdn.pnj.io/images/logo/pnj.com.vn.png',
            }}
          />
        </View>
        <Header>Sen Vàng Việt Nam</Header>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.labelInput}>Tên đăng nhập</Text>
            <TextInput
              label="Tên đăng nhập"
              returnKeyType="next"
              onChangeText={text => _onChangeUsername(text)}
              error={username.error}
              errorText={username.error}
              autoCapitalize="none"
              autoCompleteType="username"
              textContentType="username"
              style={styles.textInput}
              placeholder="Nhập tên đăng nhập..."
            />
            {username.error && (
              <Text style={styles.error}>{username.error}</Text>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.labelInput}>Mật khẩu</Text>
            <TextInput
              label="Mật khẩu"
              returnKeyType="done"
              onChangeText={text => _onChangePass(text)}
              error={password.error}
              errorText={password.error}
              secureTextEntry
              style={styles.textInput}
              placeholder="Nhập mật khẩu..."
            />
            {password.error && (
              <Text style={styles.error}>{password.error}</Text>
            )}
          </View>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgot}>Quên mật khẩu</Text>
          </View>
          {isValid && (
            <View style={styles.formError}>
              <Text style={styles.error}>
                Tên đăng nhập hoặc mật khẩu không đúng
              </Text>
            </View>
          )}
          <View style={styles.formBtn}>
            <Text style={styles.btnLogin} onPress={onLogin}>
              Đăng nhập
            </Text>
          </View>
        </View>
      </View>
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#003868"
          />
        </View>
      )}
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  formLogin: {
    textAlign: 'center',
    position: 'relative',
    top: '20%',
    padding: 40,
    height: '100%',
  },
  form: {
    display: 'flex',
    gap: 8,
  },
  formControl: {
    display: 'flex',
    gap: 4,
  },
  labelInput: {
    fontSize: 12,
  },
  textInput: {
    borderColor: '#003868',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  formBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#003868',
    width: 100,
    color: '#fff',
    textAlign: 'center',
    height: 50,
    lineHeight: 50,
    borderRadius: 4,
  },
  forgotPassword: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  forgot: {
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
  },
  formError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: '#00000021',
  },
});
