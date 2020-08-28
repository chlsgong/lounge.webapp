import { createSlice } from '@reduxjs/toolkit';
import { initialState, extraReducer } from './reducer';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: extraReducer,
});

export default userSlice;
