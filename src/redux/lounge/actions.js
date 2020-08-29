import { createAsyncThunk } from '@reduxjs/toolkit';

import { createLounge } from '../../api/lounge';

export const createLoungeRoom = createAsyncThunk(
  'lounge/createLoungeRoom',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const lounge = {
        hostId,
        name,
        code,
        refreshToken,
      };
      const response = await createLounge(lounge);
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
