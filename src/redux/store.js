import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/login';

const store = configureStore({
  reducer: loginSlice.reducer,
});

export default store;
