import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  View,
  Animated,
  Image,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from '../components/Loader';
import { useGetBooksWithInRadiusQuery } from '../features/bookSlice';

const Home = ({ navigation, route }) => {
  const {
    data: books,
    isFetching,
    isSuccess,
    isLoading,
  } = useGetBooksWithInRadiusQuery();

  console.log(books);
  // Animated.add(1);

  // const { books } = useSelector((state) => state.book);
  // console.log(book[0].images);
  return isFetching || isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        position: 'relative',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'rgb(50, 50, 50)',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/BOOK_E.png')}
          style={{ width: 160, height: 60 }}
        />
        <Icon
          name="hearto"
          color="#fff"
          size={30}
          style={{ marginRight: 20 }}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {books.data.length > 0 ? (
          books.data.map((data, index) => {
            return (
              <Card
                uri={data.images}
                name={data.name}
                description={data.description}
                id={data._id}
                key={index}
              />
            );
          })
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: '#900',
              fontSize: 20,
              justifyContent: 'center',
            }}
          >
            No Books Available in Your Area (within 5 km).
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'afff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerText: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: 'rgb(50,50,50)',
    paddingVertical: 10,
  },
});
