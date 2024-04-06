import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {register} from '../../Redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const toast = useToast();
  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.show("Passwords don't match", {
        type: 'danger',
        animationType: 'zoom-in',
      });
      return;
    }

    if (username.length < 4 || username.length > 16) {
      toast.show('Username must be between 4 and 16 characters', {
        type: 'danger',
        animationType: 'zoom-in',
      });
      return;
    }

    if (!email.includes('@')) {
      toast.show('Invalid email format', {
        type: 'danger',
        animationType: 'zoom-in',
      });
      return;
    }

    dispatch(
      register({
        username,
        email,
        password,
        confirmPassword,
        phoneNumber,
        firstName,
        lastName,
        id: '',
      }),
    );
    toast.show('Registration Successful', {
      type: 'success',
      animationType: 'zoom-in',
    });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Registration</Text>
            <View style={styles.nameContainer}>
              <TextInput
                style={[styles.input, styles.nameInput1]}
                placeholder="First Name"
                value={firstName}
                returnKeyType="next"
                onChangeText={setFirstName}
              />
              <TextInput
                style={[styles.input, styles.nameInput2]}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.signInText}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  nameInput1: {
    width: '48%',
  },
  nameInput2: {
    width: '48%',
  },
  signInText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegistrationScreen;
