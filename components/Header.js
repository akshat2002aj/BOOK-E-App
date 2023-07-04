import { View, Text } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { clearMessage } from '../features/authSlice';

const Header = ({ icons, backAction, title }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header
      mode="center-aligned"
      style={{ backgroundColor: 'rgb(50, 50, 50)' }}
    >
      {backAction && (
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('home');
          }}
          color="#fff"
        />
      )}
      <Appbar.Content title={title} color="#fff" />
      {icons && (
        <Appbar.Action icon="dots-vertical" onPress={() => {}} color="#fff" />
      )}
    </Appbar.Header>
  );
};

export default Header;
