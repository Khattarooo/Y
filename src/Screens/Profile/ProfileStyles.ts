import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    width: '30%',
    textAlign: 'left',
    color: 'black',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 'auto',
    color: 'black',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
});
export default styles;
