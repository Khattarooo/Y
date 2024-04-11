import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Home from '../Screens/Home/Home';
import AddPostStackScreen from './AddPostNavigation';
import SavedPosts from '../Screens/SavedPosts/SavedPost';
import {useNavigation} from '@react-navigation/native';
import Search from '../Screens/SearchScreen/Search';
import {
  CameraIcon,
  HomeIcon,
  SaveIcon,
  SearchIcon,
  LogoIconHeader,
} from '../Components/Atoms/Icon';

const Tab = createBottomTabNavigator();

export default function App() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.toggleDrawer();
  };

  const renderLeftButton = () => (
    <TouchableOpacity onPress={openDrawer} style={styles.touchable}>
      <Image source={require('../assets/menu.png')} style={styles.leftButton} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/w1.jpg')}
      style={styles.background}>
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
          name=" "
          component={Home}
          options={{
            headerTitle: LogoIconHeader,
            tabBarIcon: HomeIcon,
            headerLeft: renderLeftButton,
          }}
        />

        <Tab.Screen
          name="AddPostStackScreen"
          component={AddPostStackScreen}
          options={{
            headerTitle: 'Create Post',
            tabBarIcon: CameraIcon,
            headerLeft: renderLeftButton,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: SearchIcon,
            headerLeft: renderLeftButton,
          }}
        />
        <Tab.Screen
          name="SavedPosts"
          component={SavedPosts}
          options={{
            headerTitle: 'Saved Post',
            tabBarIcon: SaveIcon,
            headerLeft: renderLeftButton,
          }}
        />
      </Tab.Navigator>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  leftButton: {
    height: 30,
    width: 30,
  },
  touchable: {
    marginLeft: 10,
  },
});
