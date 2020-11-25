import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducer, extraReducer } from './reducer';

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: reducer,
  extraReducers: extraReducer,
});

export default playerSlice;
