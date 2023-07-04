import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-native-paper';
import { useProfileQuery } from '../features/authSlice';

const Footer = () => {
  const navigation = useNavigation();

  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: profile, isSuccess } = useProfileQuery();

  const handleProfile = () => {
    if (profile.success && isSuccess) {
      navigation.navigate('profile');
    } else {
      navigation.navigate('login');
    }
  };

  const handleBooks = () => {
    navigation.navigate('addBooks');
  };
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBooks()}>
        <MaterialIcon name="bookshelf" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleProfile()}>
        <Icon name="user" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    padding: 15,
    backgroundColor: 'rgb(50,50,50)',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
