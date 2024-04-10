import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import PostCard from '../../Components/Organisime/PostCard';

interface Post {
  isSaved: boolean;
  id: string;
  firstName: string;
  lastName: string;
  date: number;
  description: string;
  path: string;
  image: string;
  tags: string[];
  time: number;
}

const SavedPosts: React.FC = () => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track loading status

  const fetchSavedPosts = useCallback(async () => {
    try {
      const response = await axios.get<Post[]>(
        'https://660e99fb356b87a55c4f8cb9.mockapi.io/posts?isSaved=true',
      );
      setSavedPosts(response.data);
    } catch (error) {
      setSavedPosts([]);
    } finally {
      setLoading(false); // Update loading state after fetching posts
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSavedPosts();
  }, [fetchSavedPosts]);

  useEffect(() => {
    fetchSavedPosts();
  }, [fetchSavedPosts]);

  const handleSavePost = async (postId: string) => {
    try {
      const updatedPosts = savedPosts.map(post => {
        if (post.id === postId) {
          return {...post, isSaved: !post.isSaved};
        }
        return post;
      });
      setSavedPosts(updatedPosts);

      const postToUpdate = savedPosts.find(post => post.id === postId);
      if (!postToUpdate) return;

      const response = await axios.put(
        `https://660e99fb356b87a55c4f8cb9.mockapi.io/posts/${postId}`,
        {isSaved: !postToUpdate.isSaved},
      );
      console.log('Post saved status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating saved post status:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={1}>
      {savedPosts.length === 0 && !loading && (
        <View style={styles.centeredContainer}>
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>No Saved Posts</Text>
          </View>
        </View>
      )}
      <FlatList
        data={savedPosts}
        renderItem={({item}) => (
          <PostCard
            firstName={item.firstName}
            lastName={item.lastName}
            date={item.date}
            description={item.description}
            path={item.path}
            image={item.image}
            tags={item.tags}
            username={''}
            id={item.id}
            displayImage={!!item.path}
            displayDescription={!!item.description}
            isSaved={item.isSaved || false}
            onSave={() => handleSavePost(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#20a1e1', '#20a1e1']}
            tintColor="#20a1e1"
            title="Pull to Refresh"
            titleColor="#000"
          />
        }
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SavedPosts;
