// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './pages/reducers';

const store = configureStore({
  reducer: rootReducer
});

export default store;