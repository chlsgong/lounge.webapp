import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectAccessToken } from '../auth/selectors';
import { getSpotifyUserProfile } from '../../api/spotify';
import { getUser, createUser } from '../../api/lounge';

export const requestSpotifyUserProfile = createAsyncThunk(
  'user/requestSpotifyUserProfile',
  async (_, thunkAPI) => {
    try {
      const token = selectAccessToken(thunkAPI.getState());
      const response = await getSpotifyUserProfile(token);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const requestLoungeUser = createAsyncThunk(
  'user/requestLoungeUser',
  async (id, thunkAPI) => {
    try {
      const response = await getUser(id);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createLoungeUser = createAsyncThunk(
  'user/createLoungeUser',
  async (id, thunkAPI) => {
    try {
      const response = await createUser(id);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
