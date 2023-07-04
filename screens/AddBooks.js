import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  DatePickerIOSBase,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { addBook } from '../features/bookSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import mime from 'mime';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(5, 'Name must be at least 8 characters')
    .required('Name is required'),
  author: Yup.string()
    .min(3, 'Author must be at leasr 3 characters')
    .required('Author is required'),
  isbn: Yup.number()
    .test(
      'len',
      'Must be exactly 13 characters',
      (val) => val.toString().length === 13
    )
    .required('ISBN is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  price: Yup.number().required('Price is required'),
});

const AddBooks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  //   const navigation = useNavigation();
  const [image, setImage] = useState();

  const bookInfo = {
    name: '',
    author: '',
    isbn: '',
    description: '',
    price: '',
  };

  const addBookHandler = (data) => {
    const myForm = new FormData();
    myForm.append('name', data.name);
    myForm.append('author', data.author);
    myForm.append('description', data.description);
    myForm.append('isbn', data.isbn);
    myForm.append('price', data.price);
    // console.log(image);
    myForm.append('images', {
      uri: image,
      type: mime.getType(image),
      name: image.split('/').pop(),
      filename: 'book',
    });
    if (image.length > 0) {
      dispatch(addBook(myForm));
      navigation.navigate('home');
    }
  };

  const handleImage = () => {
    navigation.navigate('camera', { addBook: true });
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setImage(route.params.image);
      }
    }
  }, [route]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}
    >
      <Header
        title="Add Book"
        backAction={false}
        icons={false}
        navigate="home"
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={styles.register}>
          <View style={{ width: '70%' }}>
            <Formik
              initialValues={bookInfo}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                console.log(values);
                addBookHandler(values);
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
                const { name, author, isbn, description, price } = values;
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
                      placeholder="Author"
                      value={author}
                      onChangeText={handleChange('author')}
                      onBlur={handleBlur('author')}
                      error={touched.author && errors.author}
                    />
                    <Input
                      placeholder="Description"
                      value={description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      error={touched.description && errors.description}
                    />
                    <Input
                      placeholder="ISBN"
                      value={isbn}
                      onChangeText={handleChange('isbn')}
                      onBlur={handleBlur('isbn')}
                      error={touched.isbn && errors.isbn}
                      keyboardType="number-pad"
                    />
                    <Input
                      placeholder="Price(Rs)"
                      value={price}
                      onChangeText={handleChange('price')}
                      onBlur={handleBlur('price')}
                      error={touched.price && errors.price}
                      keyboardType="number-pad"
                    />
                    {image && (
                      <Image source={{ uri: image }} style={{ height: 200 }} />
                    )}
                    <TouchableOpacity onPress={handleImage}>
                      <Button
                        textColor="#900"
                        mode="outlined"
                        style={{
                          borderColor: '#900',
                          marginVertical: 10,
                        }}
                      >
                        Photo
                      </Button>
                    </TouchableOpacity>
                    <Button
                      // disabled={!email || !password || !name}
                      style={styles.btn}
                      onPress={() => {
                        console.log('Pres');
                        handleSubmit();
                      }}
                    >
                      <Icon name="plus" size={20} color="#fff" />
                      <Text style={{ color: '#fff' }}>Add</Text>
                    </Button>
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBooks;

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
    marginTop: 10,
    // width: '70%',
  },
});
