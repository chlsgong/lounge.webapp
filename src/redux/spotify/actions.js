import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectActiveLoungeAccessToken } from '../lounge/selectors';
import { querySpotify, postAddToSpotifyQueue } from '../../api/spotify';

export const querySpotifyCatalog = createAsyncThunk(
  'spotify/querySpotifyCatalog',
  async (queryString, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = selectActiveLoungeAccessToken(state);
      const response = await querySpotify(accessToken, queryString);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addToSpotifyQueue = createAsyncThunk(
  'spotify/addToSpotifyQueue',
  async (uri, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = selectActiveLoungeAccessToken(state);
      const response = await postAddToSpotifyQueue(accessToken, uri);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
