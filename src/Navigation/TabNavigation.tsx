import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import {Image, ImageBackground} from 'react-native';
import AddPostStackScreen from './AddPostNavigation';
import Search from '../Screens/SearchScreen/Search';
import SavedPosts from '../Screens/SavedPosts/SavedPost';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ImageBackground source={require('../assets/w1.jpg')} style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarStyle: {
            marginVertical: 8,
            marginHorizontal: 10,
            height: 55,
            borderRadius: 30,
            overflow: 'hidden',
          },
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#20a1e1',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/home1.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('../assets/search.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddPostStackScreen"
          component={AddPostStackScreen}
          options={{
            headerTitle: 'Create Post',
            tabBarIcon: () => (
              <Image
                source={require('../assets/camera.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SavedPosts"
          component={SavedPosts}
          options={{
            headerTitle: 'Create Post',
            tabBarIcon: () => (
              <Image
                source={require('../assets/save.png')}
                style={{width: 30, height: 30}}
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
