import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

import config from '../../config';

const requestSpotifyTokenAPI = (code) => {
  return axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.spotify.REDIRECT_URI,
      client_id: '16efad44cfd54e3ea050d602af68eadd',
      client_secret: '10f26b66944143449acf95adcc4074bb',
    })
  );
}

export const requestSpotifyToken = createAsyncThunk(
  'auth/requestSpotifyToken',
  async (code, thunkAPI) => {
    try {
      const response = await requestSpotifyTokenAPI(code);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
