import { View, Text } from 'react-native';
import React from 'react';
import { Card, Avatar, Button } from 'react-native-paper';
import { BASE_URL } from '../constant';
import { useNavigation } from '@react-navigation/native';

// const LeftContent = () => <Avatar.Icon icon="folder" />;
const CardContainer = (props) => {
  const navigation = useNavigation();
  const { uri, name, description, id } = props;
  // console.log(uri);
  const handleDetails = (id) => {
    console.log(id);
    navigation.navigate('book', {
      bookId: id,
    });
  };
  const url = `${BASE_URL}/image/books`;
  return (
    <Card
      style={{
        marginHorizontal: 30,
        marginVertical: 20,
        paddingHorizontal: 10,
        paddingTop: 15,
      }}
      mode="elevated"
    >
      <Card.Cover source={{ uri: `${url}/${uri}` }} />
      <Card.Content style={{ paddingTop: 10 }}>
        <Text variant="titleLarge" style={{ fontSize: 20, fontWeight: '500' }}>
          {name}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ fontSize: 10, fontStyle: 'italic' }}
        >
          {description.substring(0, 100)}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          style={{ borderColor: '#900', width: 100 }}
          textColor="#900"
          onPress={() => handleDetails(id)}
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CardContainer;
