import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {logout} from '../../Redux/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username: {userData?.username}</Text>
      <Text style={styles.text}>Email: {userData?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;
