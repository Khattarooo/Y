import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {logout} from '../../Redux/slices/authSlice';
import CustomButton from '../../Components/Atoms/Button';
import styles from './ProfileStyles';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const {username, email, firstName, lastName, image, gender} = userData;
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <ImageBackground
      source={require('../../assets/w1.jpg')}
      style={styles.backgroundImage}
      blurRadius={1}>
      <View style={styles.container}>
        <View style={styles.content}>
          {image && (
            <Image
              source={{uri: image}}
              style={styles.avatar}
              resizeMode="cover"
            />
          )}
          <View style={styles.userInfo}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.input}>{username}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.input}>{email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.input}>{firstName}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.input}>{lastName}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.input}>{gender}</Text>
          </View>
          <CustomButton title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;
