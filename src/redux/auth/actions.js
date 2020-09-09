import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectActiveLoungeRefreshToken } from '../lounge/selectors';
import { postSpotifyToken, postRefreshSpotifyToken } from '../../api/spotify';

export const requestSpotifyToken = createAsyncThunk(
  'auth/requestSpotifyToken',
  async ({ code }, thunkAPI) => {
    try {
      const response = await postSpotifyToken(code);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const refreshSpotifyToken = createAsyncThunk(
  'auth/refreshSpotifyToken',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const refreshToken = selectActiveLoungeRefreshToken(state);
      const response = await postRefreshSpotifyToken(refreshToken);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
