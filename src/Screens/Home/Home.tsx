import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  ImageBackground,
  RefreshControl,
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

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const fetchPosts = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `https://660e99fb356b87a55c4f8cb9.mockapi.io/posts?page=${page}&limit=${pageSize}`,
      );
      if (page === 1) {
        setPosts(response.data);
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.data]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setRefreshing(false);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    setPage(1);
    setRefreshing(false);
  }, [fetchPosts]);

  const handleSavePost = async (postId: string) => {
    try {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {...post, isSaved: !post.isSaved};
        }
        return post;
      });
      setPosts(updatedPosts);

      const response = await axios.put(
        `https://660e99fb356b87a55c4f8cb9.mockapi.io/posts/${postId}`,
        {isSaved: !posts.find(post => post.id === postId)?.isSaved},
      );
      console.log('Post saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={1}>
      <FlatList
        data={posts}
        renderItem={({item, index}) => (
          <PostCard
            key={item.id + index}
            firstName={item.firstName}
            lastName={item.lastName}
            date={item.date}
            description={item.description}
            path={item.path}
            image={item.image}
            tags={item.tags}
            username={''}
            id={''}
            displayImage={!!item.path}
            displayDescription={!!item.description}
            isSaved={item.isSaved || false}
            onSave={() => handleSavePost(item.id)}
          />
        )}
        keyExtractor={(item, index) => item.id + index}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#20a1e1', '#20a1e1']}
            tintColor="#20a1e1"
            title="Refreshing..."
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
});

export default Home;
