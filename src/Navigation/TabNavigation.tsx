import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Posts from '../Screens/Posts/Posts';
import Profile from '../Screens/Profile/Profile';
import {Image, ImageBackground} from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ImageBackground source={require('../assets/w1.jpg')} style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            marginVertical: 8,
            marginHorizontal: 10,
            height: 55,
            borderRadius: 30,
            overflow: 'hidden',
          },
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#20a1e1',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: 'center',
            tabBarIcon: () => (
              <Image
                source={require('../assets/home1.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Posts"
          component={Posts}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/add.png')}
                style={{width: 40, height: 40}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/profile.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ImageBackground>
  );
}
