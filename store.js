import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import BookReducer from './features/bookSlice';
import { apiSlice } from './features/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: AuthReducer,
    // book: BookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
