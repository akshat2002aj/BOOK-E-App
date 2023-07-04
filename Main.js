import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Footer from './components/Footer';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/authSlice';
import { Text } from 'react-native';
import Camera from './screens/Camera';
import AddBooks from './screens/AddBooks';
import Book from './screens/Book';
import MyBooks from './screens/MyBooks';
import { useProfileQuery } from './features/authSlice';
import Order from './screens/Order';

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useProfileQuery();

  // useEffect(() => {
  //   async function loadUser() {
  //     try {
  //       const res = await profile().unwrap();
  //     } catch (error) {}
  //   }
  //   loadUser();
  // }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSuccess ? 'home' : 'login'}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="myBooks"
          component={MyBooks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="book"
          component={Book}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addBooks"
          component={AddBooks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order"
          component={Order}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {isSuccess ? <Footer /> : ''}
    </NavigationContainer>
  );
};

export default Main;
