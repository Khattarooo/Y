import React, {useState, useEffect} from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CameraIcon from '../../assets/camera.svg';
import {useSelector} from 'react-redux';
import CustomButton from '../../Components/Atoms/Button';
import axios from 'axios';
import notifee from '@notifee/react-native';
import styles from './PostsStyles';
import {useToast} from 'react-native-toast-notifications';

interface RouteParams {
  imagePath?: string;
}
interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: string | null;
  date: Date;
}

const Posts = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = useSelector((state: {user: UserData}) => state.user);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imagePath, setImagePath] = useState<string | undefined>(undefined);
  const toast = useToast();
  const handleCamera = () => {
    navigation.navigate('CameraScreen');
  };

  const handlePost = async () => {
    if (!description || !tags.trim()) {
      toast.show('Please fill all the required fields.', {
        type: 'danger',
        animationType: 'zoom-in',
      });
      return;
    } else if (imagePath || description || tags) {
      setIsUploading(true);
      const tagsArray = tags.trim().split(' ');
      const updatedTagsArray = tagsArray.map(tag => tag.trim() + '?');

      const nonEmptyTagsArray = updatedTagsArray.filter(
        tag => tag.trim().length > 1,
      );
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonthIndex = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const currentMonthName = monthNames[currentMonthIndex];

      const formattedDate = `${currentDay} ${currentMonthName} ${currentYear}`;

      const postData = {
        ...userData,
        path: imagePath || null,
        description: description || null,
        tags: nonEmptyTagsArray.length > 0 ? nonEmptyTagsArray : null,
        date: formattedDate,
        isSaved: false,
      };

      try {
        const response = await axios.post(
          'https://660e99fb356b87a55c4f8cb9.mockapi.io/posts',
          postData,
        );
        console.log('Post uploaded successfully:', response.data);

        navigation.navigate('Home');

        setTimeout(async () => {
          try {
            await notifee.displayNotification({
              title: 'Post Uploaded',
              body: 'Your post has been uploaded successfully!',
              android: {
                channelId: 'default',
              },
            });
          } catch (error) {
            console.error('Error displaying notification:', error);
          }
        }, 2000);
      } catch (error) {
        console.error('Error uploading post:', error);
      } finally {
        setIsUploading(false);
        setDescription('');
        setTags('');
        setImagePath(undefined);
      }
    } else {
      console.warn('No content to post.');
    }
  };

  const {imagePath: routeImagePath}: RouteParams = route.params || {};
  useEffect(() => {
    if (routeImagePath) {
      setImagePath(routeImagePath);
    }
  }, [routeImagePath]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imagePath ? (
          <View style={styles.imageContainer}>
            <Image source={{uri: imagePath}} style={styles.image} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleCamera}>
            <View style={styles.placeholderContainer}>
              <CameraIcon width={50} height={50} />
            </View>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter your post"
          // multiline
          returnKeyType="send"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Add tags (separated by space)"
          value={tags}
          onChangeText={text => setTags(text)}
        />
        <CustomButton
          title={isUploading ? 'Uploading...' : 'Post'}
          onPress={handlePost}
        />
      </View>
    </View>
  );
};

export default Posts;
