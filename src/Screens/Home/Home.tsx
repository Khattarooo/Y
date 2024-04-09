import React from 'react';
import {FlatList, Text, View, StyleSheet, ImageBackground} from 'react-native';

const posts = [
  {
    id: '1',
    author: 'Sally',
    date: 'Mar 28, 2022',
    content: 'It was great catching up with my bestie',
    likes: 20,
    comments: 3,
    shares: 1,
  },
  {
    id: '2',
    author: 'Sally',
    date: 'Mar 28, 2022',
    content: 'It was great day',
    likes: 1,
    comments: 3,
    shares: 1,
  },
];

const Post = ({author, date, content, likes, comments, shares}) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.interactionBar}>
        <Text style={styles.interactionText}>❤️ {likes}</Text>
        <Text style={styles.interactionText}>💬 {comments}</Text>
        <Text style={styles.interactionText}>🔗 {shares}</Text>
      </View>
    </View>
  );
};

// Home Component
const Home = () => {
  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={2}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post {...item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
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
  author: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  interactionText: {
    fontSize: 20,
    color: 'grey',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Home;
