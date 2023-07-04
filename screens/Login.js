import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, clearError } from '../features/authSlice';
import { useLoginMutation } from '../features/authSlice';
// import SnackBar from 'react-native-snackbar-component';
import Header from '../components/Header';
import Loader from '../components/Loader';
// import { formToJSON } from 'axios';
import SnackBar from '../components/SnackBar';

const Login = ({ navigation }) => {
  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      navigation.navigate('profile');
    } catch (error) {
      console.log(isSuccess);
      console.log(isError);
      console.log(error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}
    >
      <Header title="Login" backAction={false} icons={false} navigate="home" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={styles.login}>
          {error && (
            <>
              <Text>Akshat</Text>
              <SnackBar
                visible={true}
                message={error.data.message}
                duration={7000}
                intro="error"
              />
            </>
          )}
          <Text style={styles.headerText}>WELCOME</Text>
          <View style={{ width: '70%' }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Button
            disabled={!email || !password}
            style={styles.btn}
            onPress={loginHandler}
          >
            <Text style={{ color: '#fff' }}>Login</Text>
          </Button>
          <Text style={{ marginTop: 20 }}>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={{ color: '#900', height: 30, margin: 20 }}>
              Create a new Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    margin: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: '#900',
    padding: 5,
    width: '70%',
  },
});
