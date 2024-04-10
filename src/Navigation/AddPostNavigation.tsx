import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Posts from '../Screens/Posts/Posts';
import CameraScreen from '../Screens/CameraScreen/CameraScreen';

function AddPostStackScreen() {
  const AddPostStack = createNativeStackNavigator();

  return (
    <AddPostStack.Navigator initialRouteName="Posts">
      <AddPostStack.Screen
        name="Posts"
        component={Posts}
        options={{headerShown: false}}
      />
      <AddPostStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{headerShown: false}}
      />
    </AddPostStack.Navigator>
  );
}
export default AddPostStackScreen;
