import {useState, useEffect, useCallback} from 'react';
import {fetchPosts, savePost} from '../utils/api';
import {Post} from '../utils/types';
import {useToast} from 'react-native-toast-notifications';

export const usePostHandling = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const toast = useToast();

  const fetchPostsData = useCallback(async () => {
    setRefreshing(true);
    try {
      const newPosts = await fetchPosts(page, pageSize);
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      }
    } catch (error) {
      toast.show('Error fetching posts', {
        type: 'danger',
        animationType: 'zoom-in',
      });
    } finally {
      setRefreshing(false);
    }
  }, [page, pageSize, toast]);

  const handleRefresh = useCallback(() => {
    setPage(1);
  }, []);

  const handleSavePost = async (postId: string) => {
    try {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {...post, isSaved: !post.isSaved};
        }
        return post;
      });
      setPosts(updatedPosts);

      await savePost(postId, !posts.find(post => post.id === postId)?.isSaved);
    } catch (error) {
      toast.show('Error saving post', {
        type: 'danger',
        animationType: 'zoom-in',
      });
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchPostsData();
  }, [fetchPostsData]);

  return {posts, refreshing, handleRefresh, handleSavePost, handleLoadMore};
};
