import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Registration from '../Screens/Registration/Registration';
import Login from '../Screens/Login/Login';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
