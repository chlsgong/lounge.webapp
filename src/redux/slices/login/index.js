import { createSlice } from '@reduxjs/toolkit';
import reducer, { initialState } from './reducer';

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: reducer
});

export default loginSlice;
