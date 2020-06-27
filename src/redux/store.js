import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './login/slice';
import authSlice from './auth/slice';

const reducer = {
  login: loginSlice.reducer,
  auth: authSlice.reducer,
};

const store = configureStore({
  reducer,
});

export default store;
