import { configureStore } from '@reduxjs/toolkit';
import businessInfoReducer from '../../api/businessInfoSlice.js';

const store = configureStore({
  reducer: {
    businessInfo: businessInfoReducer,
  }
});

export default store;
