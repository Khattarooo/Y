import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  TextInput,
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import PostCard from '../../Components/Organisime/PostCard/PostCard';
import styles from './SearchStyles';
import {Post} from '../../utils/types';

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://660e99fb356b87a55c4f8cb9.mockapi.io/posts',
      );
      const sortedPosts = response.data.sort(
        (a: {date: number}, b: {date: number}) => a.date - b.date,
      );
      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        post =>
          post.tags &&
          post.tags.some(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredPosts(filtered);
    }
    setRefreshing(false);
  }, [fetchPosts, posts, searchQuery]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text.trim() === '') {
        setFilteredPosts(posts);
      } else {
        const filtered = posts.filter(
          post =>
            post.tags &&
            post.tags.some(tag =>
              tag.toLowerCase().includes(text.toLowerCase()),
            ),
        );
        setFilteredPosts(filtered);
      }
    },
    [posts],
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={1}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by tag..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {filteredPosts.length === 0 ? (
        <View style={styles.centeredContainer}>
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>No posts found</Text>
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#20a1e1', '#20a1e1']}
              tintColor="#20a1e1"
              title="Refreshing..."
              titleColor="#000"
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          renderItem={({item}) => (
            <PostCard
              firstName={item.firstName}
              lastName={item.lastName}
              date={item.date}
              description={item.description}
              path={item.path}
              image={item.image}
              tags={item.tags}
              displayImage={!!item.path}
              displayDescription={!!item.description}
              showSaveButton={false}
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
              title="Refreshing..."
              titleColor="#000"
            />
          }
        />
      )}
    </ImageBackground>
  );
};

export default Search;
