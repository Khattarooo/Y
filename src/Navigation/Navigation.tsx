import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InitialNavigation from './InitialNavigation';
import TabNavigation from './TabNavigation';
import {selectIsAuthenticated} from '../Redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';

const Navigation = () => {
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state),
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigation /> : <InitialNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
