import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  querySpotify,
  postAddToSpotifyQueue,
  transferPlayback,
  getSpotifyArtist,
  getSpotifyArtistAlbums,
  getSpotifyArtistTopTracks,
  getSpotifyAlbumTracks,
  getCurrentlyPlaying,
  postPrevious,
  postNext,
  putPlay,
  putPause,
} from '../../api/spotify';
import { refreshIfNeeded } from '../../utils/auth';

export const querySpotifyCatalog = createAsyncThunk(
  'spotify/querySpotifyCatalog',
  async ({ queryString, limit }, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await querySpotify(accessToken, queryString, limit);
        return response.data;
      }
      catch(error) {
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
        return response.data;
      }
      catch(error) {
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
        return response.data;
      }
      catch(error) {
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
        return response.data;
      }
      catch(error) {
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
        return response.data;
      }
      catch(error) {
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
        return response.data;
      }
      catch(error) {
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
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const retrieveCurrentlyPlaying = createAsyncThunk(
  'spotify/retrieveCurrentlyPlaying',
  async (_, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await getCurrentlyPlaying(accessToken);
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const playPrevious = createAsyncThunk(
  'spotify/playPrevious',
  async (_, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await postPrevious(accessToken);
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const playNext = createAsyncThunk(
  'spotify/playNext',
  async (_, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await postNext(accessToken);
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const play = createAsyncThunk(
  'spotify/play',
  async (_, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await putPlay(accessToken);
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);

export const pause = createAsyncThunk(
  'spotify/pause',
  async (_, thunkAPI) => await refreshIfNeeded(
    thunkAPI,
    async accessToken => {
      try {
        const response = await putPause(accessToken);
        return response.data;
      }
      catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  ),
);
