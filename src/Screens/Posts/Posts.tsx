import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

const Posts = () => {
  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={{flex: 1}}
      blurRadius={2.5}>
      <View>
        <Text>Posts</Text>
      </View>
    </ImageBackground>
  );
};

export default Posts;
