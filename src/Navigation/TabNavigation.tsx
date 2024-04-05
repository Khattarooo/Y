import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Posts from '../Screens/Posts/Posts';
import Profile from '../Screens/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
