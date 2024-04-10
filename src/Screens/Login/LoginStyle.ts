import {StyleSheet} from 'react-native';

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
export default styles;
