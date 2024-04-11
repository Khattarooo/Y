import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

export const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Notification Permission Denied',
        'You need to grant Notification permission. Would you like to open app settings?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return false;
    }
  } catch (err) {
    return null;
  }
};

export const requestMediaPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Storage Permission Denied',
        'You need to grant Storage permission. Would you like to open app settings?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return false;
    }
  } catch (err) {
    return null;
  }
};
export const useCheckAndOpenCamera = () => {
  const {requestPermission, hasPermission} = useCameraPermission();

  const checkAndOpenCamera = async () => {
    if (hasPermission) {
      return true;
    } else {
      const isAccessGranted = await requestPermission();
      if (!isAccessGranted) {
        Alert.alert(
          'Permission required',
          'Open settings to grant permission',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open settings',
              style: 'default',
              onPress: async () => {
                await Linking.openSettings();
              },
            },
          ],
        );
        return false;
      } else {
        return true;
      }
    }
  };

  return checkAndOpenCamera;
};
