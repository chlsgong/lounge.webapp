import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectRefreshToken } from '../auth/selectors';
import { selectId } from '../user/selectors';
import { createLounge, getLounge, openLounge, closeLounge, joinLounge } from '../../api/lounge';

export const createLoungeRoom = createAsyncThunk(
  'lounge/createLoungeRoom',
  async (name, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const hostId = selectId(state);
      const refreshToken = selectRefreshToken(state);
      const lounge = {
        hostId,
        name,
        refreshToken,
      };

      const response = await createLounge(lounge);
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getLoungeRoom = createAsyncThunk(
  'lounge/getLoungeRoom',
  async (loungeId, thunkAPI) => {
    try {
      const response = await getLounge(loungeId);
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const openLoungeRoom = createAsyncThunk(
  'lounge/openLoungeRoom',
  async (loungeId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = selectId(state);
      const response = await openLounge({ userId, loungeId });
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const closeLoungeRoom = createAsyncThunk(
  'lounge/closeLoungeRoom',
  async (loungeId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = selectId(state);
      const response = await closeLounge({ userId, loungeId });
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const joinLoungeRoom = createAsyncThunk(
  'lounge/joinLoungeRoom',
  async (code, thunkAPI) => {
    try {
      const response = await joinLounge(code);
      return response.data;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
