import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
let color;
const SnackBar = ({ visible, message, duration, intro }) => {
  const [animation] = useState(new Animated.Value(0));
  if (intro === 'success') {
    color = '#43a446';
  } else {
    color = '#f23a2f';
  }
  useEffect(() => {
    if (visible) {
      showSnackbar();
      const timer = setTimeout(hideSnackbar, duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const showSnackbar = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideSnackbar = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const snackbarStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 15,
          left: 5,
          right: 5,
          backgroundColor: color,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 10,
        },
        snackbarStyle,
      ]}
    >
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  );
};

export default SnackBar;

const styles = StyleSheet.create({
  messageText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
