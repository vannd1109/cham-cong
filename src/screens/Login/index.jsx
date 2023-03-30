import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch} from 'react-redux';
import {login} from './../../actions/auth';
import {theme} from '../../core/theme';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik, Field, Form} from 'formik';

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
    <View style={styles.formLogin}>
      <Header>Sen Vàng Việt Nam</Header>
      <Spinner visible={isLoading} textStyle={styles.spinnerTextStyle} />
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
  );
};
export default Login;
const styles = StyleSheet.create({
  formLogin: {
    textAlign: 'center',
    position: 'relative',
    top: '25%',
    padding: 40,
  },
  form: {
    display: 'flex',
    gap: 8,
  },
  formControl: {
    display: 'flex',
    gap: 4,
  },
  labelInput: {},
  textInput: {
    borderColor: '#003868',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
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
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
  },
  formError: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  }
});
