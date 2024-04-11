import React from 'react';
import {FlatList, ImageBackground, RefreshControl} from 'react-native';
import PostCard from '../../Components/Organisime/PostCard/PostCard';
import {usePostHandling} from '../../Hooks/usePostHandling';
import {Post} from '../../utils/types';
import styles from './HomeStyles';

const Home: React.FC = () => {
  const {posts, refreshing, handleRefresh, handleLoadMore, handleSavePost} =
    usePostHandling();

  const renderPostCard = ({item, index}: {item: Post; index: number}) => (
    <PostCard
      key={item.id + index}
      firstName={item.firstName}
      lastName={item.lastName}
      date={item.date}
      description={item.description}
      path={item.path}
      image={item.image}
      tags={item.tags}
      displayImage={!!item.path}
      displayDescription={!!item.description}
      isSaved={item.isSaved || false}
      onSave={() => handleSavePost(item.id)}
    />
  );

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={1}>
      <FlatList
        data={posts}
        renderItem={renderPostCard}
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
export default Home;
