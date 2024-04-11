import {useEffect, useState, useRef} from 'react';
import {useCameraDevice} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  requestMediaPermission,
  requestNotificationPermission,
  useCheckAndOpenCamera,
} from '../utils/permissionUtils';
import {Camera} from 'react-native-vision-camera';
import {useToast} from 'react-native-toast-notifications';

export const useCameraLogic = () => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera | null>(null);
  const navigation = useNavigation();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const checkAndOpenCamera = useCheckAndOpenCamera();
  const toast = useToast();

  useEffect(() => {
    const openCamera = async () => {
      const isCameraAccessible = await checkAndOpenCamera();
      if (isCameraAccessible) {
        setIsCameraVisible(true);
        requestNotificationPermission();
      }
    };
    openCamera();
  }, [checkAndOpenCamera]);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      toast.show('Photo Taken', {
        type: 'success',
        animationType: 'zoom-in',
      });
      navigation.navigate('Posts', {imagePath: `file://${photo.path}`});
    } else {
      toast.show('Camera is not accessible', {
        type: 'danger',
        animationType: 'zoom-in',
      });
    }
  };

  const pickImageFromGallery = async () => {
    const permissionGranted = await requestMediaPermission();
    if (permissionGranted) {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        response => {
          if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            toast.show('Photo Uploaded', {
              type: 'success',
              animationType: 'zoom-in',
            });
            navigation.navigate('Posts', {imagePath: selectedImage.uri});
          } else {
            toast.show('No Image Selected', {
              type: 'danger',
              animationType: 'zoom-in',
            });
          }
        },
      );
    }
  };

  return {device, camera, isCameraVisible, takePhoto, pickImageFromGallery};
};
