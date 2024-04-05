import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import InitialNavigation from './InitialNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';

const Navigation = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  return (
    <NavigationContainer>
      {userData ? <TabNavigation /> : <InitialNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
