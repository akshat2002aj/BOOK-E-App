import {
  View,
  Text,
  Touchable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { BASE_URL } from '../constant';
import Loader from '../components/Loader';
import { useGetBookByIdQuery } from '../features/bookSlice';

const url = `${BASE_URL}/image/books`;

const Book = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    data: book,
    isSuccess,
    isLoading,
  } = useGetBookByIdQuery(route.params.bookId);

  const handleOrder = () => {
    navigation.navigate('order', { bookId: route.params.bookId });
  };

  return isLoading ? (
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
      <Header title="Book" backAction={true} icons={false} navigate="home" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: '#900',
            marginBottom: 20,
            marginHorizontal: 20,
            marginTop: 40,
            textAlign: 'center',
          }}
        >
          {book.name}
        </Text>
        <Image
          source={{ uri: `${url}/${book.data.images}` }}
          style={{ width: 300, height: 300 }}
        />
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
                {book.data.name}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Author</DataTable.Title>
              <DataTable.Title
                textStyle={{
                  textAlign: 'justify',
                }}
              >
                {book.data.author}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>ISBN</DataTable.Title>
              <DataTable.Title>{book.data.isbn}</DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Price</DataTable.Title>
              <DataTable.Title>{book.data.price} Rs</DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Description</DataTable.Title>
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
                {book.data.description}
              </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Availability</DataTable.Title>
              <DataTable.Title>
                {book.data.availability ? (
                  <Text style={{ color: 'green' }}>Available</Text>
                ) : (
                  <Text style={{ color: 'red' }}>Out of Stock</Text>
                )}
              </DataTable.Title>
            </DataTable.Row>
          </DataTable>
        </View>
        <Button
          style={{ backgroundColor: '#900', width: '70%', marginVertical: 15 }}
          textColor="#fff"
          onPress={handleOrder}
          disabled={!book.data.availability}
        >
          Order Book
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Book;
