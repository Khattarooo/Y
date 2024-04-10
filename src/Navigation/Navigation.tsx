import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InitialNavigation from './InitialNavigation';
import TabNavigation from './TabNavigation';
import {selectIsAuthenticated} from '../Redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import {Platform} from 'react-native';
import notifee, {AndroidChannel} from '@notifee/react-native';
// import DrawerNavigation from './DrawerNavigation';

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
    <NavigationContainer>
      {isAuthenticated ? <TabNavigation /> : <InitialNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
