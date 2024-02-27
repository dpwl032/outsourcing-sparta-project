import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '../modules/authSlice';
import businessInfoReducer from '../../redux/modules/businessInfoSlice.js';

const rootReducer = combineReducers({ auth });

const store = configureStore({
  reducer: rootReducer,
  businessInfo: businessInfoReducer,
});

export default store;
