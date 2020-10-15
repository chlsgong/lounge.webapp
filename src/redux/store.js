import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import loginSlice from './login/slice';
import authSlice from './auth/slice';
import userSlice from './user/slice';
import loungeSlice from './lounge/slice';
import spotifySlice from './spotify/slice';
import loginMiddleware from './login/middleware';
import userMiddleware from './user/middleware';
import loungeMiddleware from './lounge/middleware';
import persistenceMiddleware from './persistence/middleware';

const reducer = {
  login: loginSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  lounge: loungeSlice.reducer,
  spotify: spotifySlice.reducer,
};

const middleware = [
  ...getDefaultMiddleware(),
  persistenceMiddleware,
  loginMiddleware,
  userMiddleware,
  loungeMiddleware,
  // logger, // NOTE: must be the last middleware
];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
