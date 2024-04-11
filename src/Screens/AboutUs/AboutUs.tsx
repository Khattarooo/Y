import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const AboutUs = () => {
  return (
    <ImageBackground
      source={require('../../assets/w2.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <View style={styles.content}>
            <Text style={styles.heading}>About Us</Text>
            <Text style={styles.description}>
              Welcome to Y - Your Social Media App!
            </Text>
            <Text style={styles.description}>
              Y is dedicated to connecting people around the world.
            </Text>
            <Text style={styles.description}>
              Our team is committed to providing you with the best social media
              experience.
            </Text>
            <Text style={styles.contact}>Contact us: example@email.com</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    height: '60%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  description: {
    fontSize: 20,
    marginBottom: 15,
    color: 'black',
  },
  contact: {
    fontSize: 20,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default AboutUs;
