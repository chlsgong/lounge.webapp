import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducer } from './reducer';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: reducer,
});

export default appSlice;
