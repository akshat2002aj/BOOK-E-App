import {
  View,
  Text,
  Touchable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Button, Avatar, DataTable } from 'react-native-paper';
import Header from '../components/Header';
import { BASE_URL } from '../constant';
import { useProfileQuery, useLogoutMutation } from '../features/authSlice';
import Loader from '../components/Loader';

const url = `${BASE_URL}/image/users`;

const Profile = ({ navigation }) => {
  // const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    refetch,
    error,
    isFetching,
  } = useProfileQuery();
  console.log(isFetching);

  const [logout, { isSuccess, isLoading: loading }] = useLogoutMutation();

  // console.log(logout, e);
  const handleLogout = async () => {
    try {
      const { data } = await logout();
      navigation.navigate('login');
    } catch (error) {}
  };

  return isLoading || loading || isFetching ? (
    <Loader />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        position: 'relative',
      }}
    >
      <Header
        title="Profile"
        backAction={false}
        icons={false}
        navigate="home"
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 70,
            // marginTop: -50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('myBooks')}>
            <View
              style={{
                backgroundColor: '#85c1e9',
                padding: 15,
                borderRadius: 15,
                width: '90%',
                marginHorizontal: 20,
              }}
              onPress
            >
              <Text style={{ fontSize: 17 }}>Books Added</Text>
              <Text>{user.data.booksAdded}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#7dcea0',
                padding: 15,
                borderRadius: 15,
                width: '90%',
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 17 }}>Books Borrowed</Text>
              <Text>0</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Avatar.Image
          size={100}
          source={{ uri: `${url}/${user.data.avatar}` }}
          style={{ backgroundColor: '#900' }}
        />
        <View style={{ width: '80%', marginTop: 50 }}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>{user.data.name}</DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>{user.data.email}</DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Phone</DataTable.Title>
              <DataTable.Title>+91 {user.data.phone}</DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Address</DataTable.Title>
              <DataTable.Title numberOfLines={100}>
                {user.data.address}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Pincode</DataTable.Title>
              <DataTable.Title>{user.data.pincode}</DataTable.Title>
            </DataTable.Row>
          </DataTable>
        </View>

        <Button
          style={{ backgroundColor: '#900', width: '70%', marginVertical: 10 }}
          onPress={handleLogout}
          textColor="#fff"
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
