import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import loginSlice from './login/slice';
import authSlice from './auth/slice';
import userSlice from './user/slice';
import loungeSlice from './lounge/slice';
import spotifySlice from './spotify/slice';
import appSlice from './app/slice';
import playerSlice from './player/slice';
import authMiddleware from './auth/middleware';
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
  app: appSlice.reducer,
  player: playerSlice.reducer,
};

const middleware = [
  ...getDefaultMiddleware(),
  persistenceMiddleware,
  authMiddleware,
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
