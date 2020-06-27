import { createSlice } from '@reduxjs/toolkit';
import { initialState, extraReducer } from './reducer';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: extraReducer,
});

export default authSlice;
