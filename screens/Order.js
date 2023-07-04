import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { Button, DataTable } from 'react-native-paper';
import { useGetBookByIdQuery } from '../features/bookSlice';
import { useProfileQuery } from '../features/authSlice';

const Order = ({ navigation, route }) => {
  const {
    data: book,
    isSuccess,
    isLoading,
  } = useGetBookByIdQuery(route.params.bookId);

  const { data: profile } = useProfileQuery();

  const handlePayment = () => {};

  return (
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
        title="Order"
        backAction={false}
        icons={false}
        navigate={('addBooks', { boodId: route.params.boodId })}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Steps /> */}
        {/* <Checkout /> */}
        <View style={{ width: '80%', marginTop: 50 }}>
          <DataTable>
            <DataTable.Row style={{ flex: 1, flexWrap: 'wrap' }}>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title
                numberOfLines={1000}
                style={{
                  height: 'auto',
                  overflow: 'visible',
                }}
                textStyle={{
                  textAlign: 'justify',
                }}
              >
                {profile.data.name}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Book Name</DataTable.Title>
              <DataTable.Title
                numberOfLines={1000}
                style={{
                  height: 'auto',
                  overflow: 'visible',
                }}
                textStyle={{
                  textAlign: 'justify',
                }}
              >
                {book.data.name}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row style={{ flex: 1, flexWrap: 'wrap' }}>
              <DataTable.Title>Phone</DataTable.Title>
              <DataTable.Title
                numberOfLines={1000}
                style={{
                  height: 'auto',
                  overflow: 'visible',
                }}
                textStyle={{
                  textAlign: 'justify',
                }}
              >
                {profile.data.phone}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row style={{ flex: 1, flexWrap: 'wrap' }}>
              <DataTable.Title>Address</DataTable.Title>
              <DataTable.Title
                numberOfLines={1000}
                style={{
                  height: 'auto',
                  overflow: 'visible',
                }}
                textStyle={{
                  textAlign: 'justify',
                }}
              >
                {profile.data.address}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Price</DataTable.Title>
              <DataTable.Title>{book.data.price} Rs</DataTable.Title>
            </DataTable.Row>
          </DataTable>
        </View>
        <Button
          style={{ backgroundColor: '#900', width: '70%', marginVertical: 15 }}
          textColor="#fff"
          onPress={handlePayment}
          disabled={!book.data.availability}
        >
          Place Order
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
