import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducer, extraReducer } from './reducer';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: reducer,
  extraReducers: extraReducer,
});

export default authSlice;
