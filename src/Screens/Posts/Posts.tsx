import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CameraIcon from '../../assets/camera.svg';
import {useSelector} from 'react-redux';
import CustomButton from '../../Components/Atoms/Button';
import axios from 'axios';
import notifee from '@notifee/react-native';
import styles from './PostsStyles';
import {useToast} from 'react-native-toast-notifications';
import {UserData, RouteParams} from '../../utils/types';

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
  const handleClearImage = () => {
    setImagePath(undefined);
    setDescription('');
    setTags('');
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
        toast.show('Post uploaded successfully.', {
          type: 'success',
          animationType: 'zoom-in',
        });

        navigation.navigate(' ');

        setTimeout(async () => {
          try {
            await notifee.displayNotification({
              title: 'Post Uploaded',
              body: 'Your post has been uploaded successfully!',
              android: {
                channelId: 'default',
                pressAction: {id: 'default', launchActivity: 'default'},
              },
            });
          } catch (error) {
            toast.show('Error displaying notification.', {
              type: 'danger',
              animationType: 'zoom-in',
            });
          }
        }, 2000);
      } catch (error) {
        toast.show('Error uploading post', {
          type: 'danger',
          animationType: 'zoom-in',
        });
      } finally {
        setIsUploading(false);
        setDescription('');
        setTags('');
        setImagePath(undefined);
      }
    } else {
      toast.show('No content to post', {
        type: 'danger',
        animationType: 'zoom-in',
      });
    }
  };

  const {imagePath: routeImagePath}: RouteParams = route.params || {};
  useEffect(() => {
    if (routeImagePath) {
      setImagePath(routeImagePath);
    }
  }, [routeImagePath]);

  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.background}>
      <KeyboardAvoidingView style={styles.background} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {imagePath ? (
                <View style={styles.imageContainer}>
                  <Image source={{uri: imagePath}} style={styles.image} />
                  <TouchableOpacity
                    style={styles.clearImageButton}
                    onPress={handleClearImage}>
                    <Text style={styles.clearImageText}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={handleCamera}>
                  <View style={styles.placeholderContainer}>
                    <CameraIcon width={80} height={80} />
                  </View>
                </TouchableOpacity>
              )}
              <TextInput
                style={styles.input}
                placeholder="Enter your post"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Posts;
