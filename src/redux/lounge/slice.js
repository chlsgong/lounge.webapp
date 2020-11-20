import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducer, extraReducer } from './reducer';

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  reducers: reducer,
  extraReducers: extraReducer,
});

export default loungeSlice;
