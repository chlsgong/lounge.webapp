import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectRefreshToken } from '../auth/selectors';
import { selectId } from '../user/selectors';
import { createLounge } from '../../api/lounge';

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
      console.log('Response', response);
      return response.data;
    }
    catch(error) {
      console.log('Error', error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
