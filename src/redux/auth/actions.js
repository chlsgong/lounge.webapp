import { createAsyncThunk } from '@reduxjs/toolkit';

import { postSpotifyToken } from '../../api/spotify';

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
