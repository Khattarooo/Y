import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    fontSize: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  noPostsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  noPostsText: {
    fontSize: 18,
    color: '#333',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
