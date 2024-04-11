import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 3.8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nameContainer: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  content: {
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#20a1e1',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#20a1e5',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
