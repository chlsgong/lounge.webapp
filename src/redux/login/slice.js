import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducer, extraReducer } from './reducer';

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: reducer,
  extraReducers: extraReducer,
});

export default loginSlice;
