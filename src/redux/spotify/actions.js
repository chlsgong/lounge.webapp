import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  querySpotify,
  postAddToSpotifyQueue,
  transferPlayback,
  getSpotifyArtist,
  getSpotifyArtistAlbums,
  getSpotifyArtistTopTracks,
  getSpotifyAlbumTracks,
} from '../../api/spotify';
import { refreshIfNeeded } from '../../utils/auth';

export const querySpotifyCatalog = createAsyncThunk(
  'spotify/querySpotifyCatalog',
  async ({ queryString, limit }, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await querySpotify(accessToken, queryString, limit);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const addToSpotifyQueue = createAsyncThunk(
  'spotify/addToSpotifyQueue',
  async (uri, thunkAPI) =>  await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await postAddToSpotifyQueue(accessToken, uri);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const transferSpotifyPlayback = createAsyncThunk(
  'spotify/transferSpotifyPlayback',
  async ({ deviceId, autoPlay }, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await transferPlayback(accessToken, deviceId, autoPlay);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const retrieveSpotifyArtist = createAsyncThunk(
  'spotify/retrieveSpotifyArtist',
  async (artistId, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await getSpotifyArtist(accessToken, artistId);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const retrieveSpotifyArtistAlbums = createAsyncThunk(
  'spotify/retrieveSpotifyArtistAlbums',
  async (artistId, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await getSpotifyArtistAlbums(accessToken, artistId);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const retrieveSpotifyArtistTopTracks = createAsyncThunk(
  'spotify/retrieveSpotifyArtistTopTracks',
  async (artistId, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await getSpotifyArtistTopTracks(accessToken, artistId);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const retrieveSpotifyAlbumTracks = createAsyncThunk(
  'spotify/retrieveSpotifyAlbumTracks',
  async (albumId, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await getSpotifyAlbumTracks(accessToken, albumId);
        console.log('Response', response);
        return response.data;
      }
      catch(error) {
        console.log('Error', error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);
