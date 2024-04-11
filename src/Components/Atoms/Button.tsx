import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CustomButtonProps} from '../../utils/types';

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#20a1e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomButton;
