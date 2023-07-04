import { View, Text } from 'react-native';
import React from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Order from './Order';

const Checkout = ({ navigation, route }) => {
  //   console.log(route.params.bookId);
  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep label="First Step">
          <View style={{ alignItems: 'center' }}>
            {/* <Order data={route.params.bookId} /> */}
          </View>
        </ProgressStep>
        <ProgressStep label="Second Step">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default Checkout;
