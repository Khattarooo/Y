import React, {useState} from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../../Components/Atoms/Button';
import {useDispatch} from 'react-redux';
import {setAuthState} from '../../Redux/slices/authSlice';
import {setUserData} from '../../Redux/slices/userSlice';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import styles from './LoginStyle';
import {LogoIconHeader} from '../../Components/Atoms/Icon';

const Login = () => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      setLoading(true);

      const result = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      dispatch(setAuthState(true));
      dispatch(
        setUserData({
          id: result.data.id,
          username: result.data.username,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          gender: result.data.gender,
          image: result.data.image,
        }),
      );
      toast.show('Login Successful', {
        type: 'success',
        animationType: 'zoom-in',
      });
    } catch (err) {
      toast.show('Invalid Username or Password', {
        type: 'danger',
        animationType: 'zoom-in',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.heading}>
              <LogoIconHeader />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              returnKeyType="next"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {loading ? (
              <ActivityIndicator
                animating={true}
                size={'large'}
                color={'#20a1e1'}
              />
            ) : (
              <CustomButton title="Login" onPress={onLogin} />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;
