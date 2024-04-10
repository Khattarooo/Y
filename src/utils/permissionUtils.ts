import {Alert, Linking} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

// export const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//     );

//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return true;
//     } else {
//       Alert.alert(
//         'Camera Permission Denied',
//         'You need to grant camera permission. Would you like to open app settings?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Open Settings',
//             onPress: () => Linking.openSettings(),
//           },
//         ],
//         {cancelable: false},
//       );
//       return false;
//     }
//   } catch (err) {
//     console.warn(err);
//     return null;
//   }
// };
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
