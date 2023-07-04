import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Appbar } from 'react-native-paper';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../features/authSlice';
import mime from 'mime';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import * as Location from 'expo-location';
import Loader from '../components/Loader';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(5, 'Name must be at least 8 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .equals([Yup.ref('password'), null], 'Password does not match')
    .required('Confirm Password is required'),
  phone: Yup.number().required('Phone Number is required'),
  address: Yup.string()
    .trim()
    .min(10, 'Address must be of 10 characters')
    .required('Address is required'),
  pincode: Yup.number().required('Pincode is required'),
});

const Register = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState('');
  const [location, setLocation] = useState([]);
  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        Alert.alert(
          'Permission to access location was denied. Please allow location'
        );
        navigation.navigate('login');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation([loc.coords.longitude, loc.coords.latitude]);
    })();
  }, []);

  const userInfo = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    address: '',
    phone: '',
  };
  // const location = [32, 98];
  const handleImage = () => {
    navigation.navigate('camera');
  };

  const handleSubmit = async (data) => {
    try {
      const res = await register(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const registerHandler = (data) => {
    const myForm = new FormData();
    myForm.append('name', data.name);
    myForm.append('email', data.email);
    myForm.append('password', data.password);
    myForm.append('address', data.address);
    myForm.append('location', location);
    myForm.append('phone', data.phone);
    myForm.append('pincode', data.pincode);
    myForm.append('avatar', {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split('/').pop(),
      filename: 'user',
    });
    if (avatar.length > 0) {
      console.log(myForm);
      handleSubmit(myForm);
    } else {
    }
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);
  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}
    >
      <Header title="Register" backAction={true} icons={true} navigate="home" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={styles.register}>
          {/* <Text style={styles.headerText}>WELCOME</Text> */}
          <Avatar.Image
            size={80}
            source={avatar ? { uri: avatar } : require('../assets/avatar.png')}
            style={{ backgroundColor: '#fffr' }}
          />
          <TouchableOpacity onPress={handleImage}>
            <Text style={{ color: '#900' }}>Change Photo</Text>
          </TouchableOpacity>
          <View style={{ width: '70%' }}>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                registerHandler(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                const {
                  name,
                  email,
                  password,
                  confirmPassword,
                  address,
                  pincode,
                  phone,
                } = values;
                return (
                  <>
                    <Input
                      placeholder="Name"
                      value={name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={touched.name && errors.name}
                    />
                    <Input
                      placeholder="Email"
                      value={email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      error={touched.phone && errors.phone}
                      keyboardType="number-pad"
                    />
                    <Input
                      placeholder="Address"
                      value={address}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      error={touched.address && errors.address}
                    />
                    <Input
                      placeholder="Pincode"
                      value={pincode}
                      onChangeText={handleChange('pincode')}
                      onBlur={handleBlur('pincode')}
                      error={touched.pincode && errors.pincode}
                      keyboardType="number-pad"
                    />
                    <Input
                      secureTextEntry
                      placeholder="Password"
                      value={password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                    />
                    <Input
                      secureTextEntry
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={touched.confirmPassword && errors.confirmPassword}
                    />
                    <Button
                      // disabled={!email || !password || !name}
                      style={styles.btn}
                      onPress={handleSubmit}
                    >
                      <Text style={{ color: '#fff' }}>Register</Text>
                    </Button>
                  </>
                );
              }}
            </Formik>
          </View>
          <Text style={{ marginTop: 20 }}>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={{ color: '#900', height: 30, margin: 20 }}>
              Already have an Account?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  register: {
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
    marginTop: 5,
    // width: '70%',
  },
});
