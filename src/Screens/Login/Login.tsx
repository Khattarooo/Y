import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomButton from '../../Components/Atoms/Button';
import {useDispatch} from 'react-redux';
import {setAuthState} from '../../Redux/slices/authSlice';
import {setUserData} from '../../Redux/slices/userSlice';

import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      setLoading(true);

      const result = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      console.log('Token:', result.data.token);

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
    } catch (err) {
      Alert.alert('Invalid Username or Password');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.heading}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <CustomButton title="Login" onPress={onLogin} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: 'gray',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  signInText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});

export default Login;
