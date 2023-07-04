import { View, Text } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const loader = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator animating={true} size={100} color="#900" />
    </View>
  );
};

export default loader;
