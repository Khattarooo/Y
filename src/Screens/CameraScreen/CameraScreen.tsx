import React, {useRef, useState, useEffect} from 'react';
import {View, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './CameraScreenStyles';
import CameraIcon from '../../assets/camera.svg';
import UploadIcon from '../../assets/upload.svg';
import {useNavigation} from '@react-navigation/native';
import {useCheckAndOpenCamera} from '../../utils/permissionUtils';

const CameraScreen = () => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const navigation = useNavigation();

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const checkAndOpenCamera = useCheckAndOpenCamera();

  useEffect(() => {
    const openCamera = async () => {
      const isCameraAccessible = await checkAndOpenCamera();
      if (isCameraAccessible) {
        setIsCameraVisible(true);
      }
    };
    openCamera();
  }, [checkAndOpenCamera]);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      console.log(photo.path);
      navigation.navigate('Posts', {imagePath: `file://${photo.path}`});
    } else {
      Alert.alert('Error', 'Camera is not accessible');
    }
  };

  const pickImageFromGallery = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          console.log(selectedImage.uri);
          navigation.navigate('Posts', {imagePath: selectedImage.uri});
        } else {
          Alert.alert('Error', 'No image selected');
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isCameraVisible && device && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <View>
            <Pressable style={styles.captureButton} onPress={takePhoto}>
              <CameraIcon width={70} height={70} />
            </Pressable>
            <Pressable
              onPress={pickImageFromGallery}
              style={styles.uploadButton}>
              <UploadIcon width={40} height={40} />
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;
