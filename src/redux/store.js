import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import loginSlice from './login/slice';
import authSlice from './auth/slice';
import userSlice from './user/slice';
import loungeSlice from './lounge/slice';
import loginMiddleware from './login/middleware';
import userMiddleware from './user/middleware';

const reducer = {
  login: loginSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  lounge: loungeSlice.reducer,
};

const middleware = [
  ...getDefaultMiddleware(),
  loginMiddleware,
  userMiddleware,
  // logger, // NOTE: must be the last middleware
];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
