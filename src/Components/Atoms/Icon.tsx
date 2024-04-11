import React from 'react';
import {Image, StyleSheet} from 'react-native';

export const ProfileIcon = () => (
  <Image
    source={require('../../assets/profile.png')}
    style={styles.drawerIcon}
  />
);

export const AboutIcon = () => (
  <Image
    source={require('../../assets/aboutus.png')}
    style={styles.drawerIcon}
  />
);
export const LogoIconHeader = () => (
  <Image
    source={require('../../assets/logo.png')}
    style={styles.LogoIconHeader}
  />
);
export const LogoIcon = () => (
  <Image source={require('../../assets/logo.png')} style={styles.logoIcon} />
);

export const CameraIcon = () => (
  <Image source={require('../../assets/camera.png')} style={styles.tabIcon} />
);

export const HomeIcon = () => (
  <Image source={require('../../assets/home1.png')} style={styles.tabIcon} />
);

export const SaveIcon = () => (
  <Image source={require('../../assets/save.png')} style={styles.tabIcon} />
);

export const SearchIcon = () => (
  <Image source={require('../../assets/search.png')} style={styles.tabIcon} />
);

const styles = StyleSheet.create({
  drawerIcon: {
    height: 40,
    width: 40,
  },
  tabIcon: {
    height: 30,
    width: 30,
  },
  logoIcon: {
    height: 40,
    width: 40,
    marginLeft: 60,
  },
  LogoIconHeader: {
    height: 50,
    width: 50,
  },
});
