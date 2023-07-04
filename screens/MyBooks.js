import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMessage,
  getBooksWithinRadius,
  getMyBook,
} from '../features/bookSlice';
const MyBooks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyBook());
  }, []);

  const { book } = useSelector((state) => state.book);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}
    >
      <Header
        title="My Books"
        backAction={true}
        icons={false}
        navigate="home"
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {book.books.length > 0 ? (
          book.books.map((data, index) => {
            console.log(data);
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
          <Text style={{ textAlign: 'center', color: '#900', fontSize: 20 }}>
            No Books Added yet.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBooks;
