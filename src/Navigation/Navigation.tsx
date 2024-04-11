import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InitialNavigation from './InitialNavigation';
import {selectIsAuthenticated} from '../Redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import {Platform} from 'react-native';
import notifee, {AndroidChannel} from '@notifee/react-native';
import DrawerNavigation from './DrawerNavigation';
import {linking} from '../utils/linkingconfig';

const Navigation = () => {
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state),
  );

  async function createDefaultChannel() {
    if (Platform.OS === 'android') {
      const channel: AndroidChannel = {
        id: 'default',
        name: 'Default Channel',
      };

      await notifee.createChannel(channel);
    }
  }
  createDefaultChannel();

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <DrawerNavigation /> : <InitialNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
