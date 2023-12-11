// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // create this file

const store = configureStore({
  reducer: rootReducer,
  // Add middleware or other configurations if needed
});

export default store;
