import { createSlice } from '@reduxjs/toolkit';
import { initialState, extraReducer } from './reducer';

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  reducers: {},
  extraReducers: extraReducer,
});

export default loungeSlice;
