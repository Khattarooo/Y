import React from 'react';
import {View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera} from 'react-native-vision-camera';
import styles from './CameraScreenStyles';
import CameraIcon from '../../assets/camera.svg';
import UploadIcon from '../../assets/upload.svg';
import {useCameraLogic} from '../../Hooks/useCameraLogic';

const CameraScreen = () => {
  const {device, camera, isCameraVisible, takePhoto, pickImageFromGallery} =
    useCameraLogic();

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
