import React from 'react';
import {FlatList, Text, View, StyleSheet, ImageBackground} from 'react-native';

interface Post {
  id: string;
  author: string;
  content: string;
}

const mockData: Post[] = [
  {id: '1', author: 'User1', content: 'This is the first post'},
  {id: '2', author: 'User2', content: 'This is the second post'},
  {id: '3', author: 'User3', content: 'This is the third post'},
  {id: '4', author: 'User1', content: 'This is the first post'},
  {id: '5', author: 'User2', content: 'This is the second post'},
  {id: '6', author: 'User3', content: 'This is the third post'},
  {id: '7', author: 'User1', content: 'This is the first post'},
  {id: '8', author: 'User2', content: 'This is the second post'},
  {id: '9', author: 'User3', content: 'This is the third post'},
];

const Home: React.FC = () => {
  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.postContainer}>
      <Text style={styles.author}>{item.author}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={2}>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  postContainer: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#20a1e1',
    borderRadius: 15,
  },
  author: {
    fontWeight: 'bold',
    opacity: 1,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Home;
