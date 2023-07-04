import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Main from './Main';
import { Provider } from 'react-redux';
import store from './store';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { userApiSlice } from './features/authSlice';

export default function App() {
  return (
    <Provider store={store}>
      {/* <ApiProvider api={userApiSlice}> */}
      <Main />
      {/* </ApiProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
