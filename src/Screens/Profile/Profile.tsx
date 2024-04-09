import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';

const Profile = () => {
  const userData = useSelector((state: RootState) => state.user);

  const {username, email, firstName, lastName, gender} = userData;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, marginBottom: 10}}>Profile</Text>
      <Text>Username: {username}</Text>
      <Text>Email: {email}</Text>
      <Text>First Name: {firstName}</Text>
      <Text>Last Name: {lastName}</Text>
      <Text>Gender: {gender}</Text>
    </View>
  );
};

export default Profile;
