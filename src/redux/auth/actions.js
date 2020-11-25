import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectActiveLoungeRefreshToken } from '../lounge/selectors';
import { postSpotifyToken, postRefreshSpotifyToken } from '../../api/spotify';
import { TokenOwner } from '../../constants';
import { selectRefreshToken } from './selectors';

export const requestSpotifyToken = createAsyncThunk(
  'auth/requestSpotifyToken',
  async ({ code }, thunkAPI) => {
    try {
      const response = await postSpotifyToken(code);
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const refreshSpotifyToken = createAsyncThunk(
  'auth/refreshSpotifyToken',
  async (tokenOwner, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const refreshToken = tokenOwner === TokenOwner.user
        ? selectRefreshToken(state)
        : selectActiveLoungeRefreshToken(state);
      const response = await postRefreshSpotifyToken(refreshToken);
      return {
        ...response.data,
        tokenOwner,
      };
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
