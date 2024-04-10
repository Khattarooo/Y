import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface PostProps {
  username: string;
  date: number;
  description: string;
  path: string;
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  tags?: string[];
  displayImage: boolean;
  displayDescription: boolean;
  isSaved?: boolean;
  onSave?: () => void;
}

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
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>{isSaved ? 'Unsave' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nameContainer: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  content: {
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#20a1e1',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#20a1e1',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PostCard;
