import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const Input = (props) => {
  const { placeholder, label, error } = props;
  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      {error && (
        <Text
          style={{
            color: 'red',
            fontSize: 10,
            marginLeft: 10,
            marginBottom: 2,
            fontWeight: '300',
          }}
        >
          {error}
        </Text>
      )}
      <TextInput style={styles.input} placeholder={placeholder} {...props} />
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 15,
  },
});
