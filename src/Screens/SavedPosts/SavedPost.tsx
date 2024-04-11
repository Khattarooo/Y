import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import PostCard from '../../Components/Organisime/PostCard/PostCard';
import {Post} from '../../utils/types';
import styles from './SavePostStyle';
import {useToast} from 'react-native-toast-notifications';

const SavedPosts: React.FC = () => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchSavedPosts = useCallback(async () => {
    try {
      const response = await axios.get<Post[]>(
        'https://660e99fb356b87a55c4f8cb9.mockapi.io/posts?isSaved=true',
      );
      setSavedPosts(response.data);
    } catch (error) {
      setSavedPosts([]);
    } finally {
      setLoading(false);
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
      toast.show('Error updating saved post status', {
        type: 'danger',
        animationType: 'zoom-in',
      });
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

export default SavedPosts;
