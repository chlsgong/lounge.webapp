import { createAsyncThunk } from '@reduxjs/toolkit';

import { TokenOwner } from '../../constants';
import { getSpotifyUserProfile } from '../../api/spotify';
import { getUser, createUser } from '../../api/lounge';
import { refreshIfNeeded } from '../../utils/auth';

export const requestSpotifyUserProfile = createAsyncThunk(
  'user/requestSpotifyUserProfile',
  async (_, thunkAPI) =>  await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await getSpotifyUserProfile(accessToken);
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
    TokenOwner.user,
  ),
);

export const requestLoungeUser = createAsyncThunk(
  'user/requestLoungeUser',
  async (id, thunkAPI) => {
    try {
      const response = await getUser(id);
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createLoungeUser = createAsyncThunk(
  'user/createLoungeUser',
  async (id, thunkAPI) => {
    try {
      const response = await createUser(id);
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
