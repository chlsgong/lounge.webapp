import { createSlice } from '@reduxjs/toolkit';
import { initialState, extraReducer } from './reducer';

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {},
  extraReducers: extraReducer,
});

export default spotifySlice;
