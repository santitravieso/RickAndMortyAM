// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './apiReducer'; // create this file

const rootReducer = combineReducers({
  api: apiReducer,
});

export default rootReducer;
