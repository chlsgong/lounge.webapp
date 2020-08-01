import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import loginSlice from './login/slice';
import authSlice from './auth/slice';
import loginMiddleware from './login/middleware';

const reducer = {
  login: loginSlice.reducer,
  auth: authSlice.reducer,
};

const middleware = [
  ...getDefaultMiddleware(),
  loginMiddleware,
  // logger, // NOTE: must be the last middleware
];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
