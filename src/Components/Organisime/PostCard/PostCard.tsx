import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './PostCardStyles';
import {PostProps} from '../../../utils/types';

const PostCard: React.FC<PostProps> = ({
  firstName,
  lastName,
  date,
  description,
  path,
  tags = [],
  image,
  displayImage,
  displayDescription,
  isSaved,
  onSave,
  showSaveButton = true,
}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{uri: image}} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.author}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.date}>{date} </Text>
        </View>
      </View>
      {displayDescription && <Text style={styles.content}>{description}</Text>}
      {displayImage && <Image source={{uri: path}} style={styles.postImage} />}
      <View style={styles.tagsContainer}>
        {Array.isArray(tags) &&
          tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
      </View>
      {showSaveButton && (
        <TouchableOpacity
          onPress={onSave}
          style={[
            styles.saveButton,
            {backgroundColor: isSaved ? '#43ab16' : '#20a1e5'},
          ]}>
          <Text style={styles.saveButtonText}>
            {isSaved ? 'Unsave' : 'Save'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostCard;
