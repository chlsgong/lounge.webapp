import { querySpotifyCatalog } from './actions';

// Spotify reducer

export const initialState = {
  searchResults: {
    tracks: [],
    albums: [],
    artists: [],
  },
};

export const extraReducer = {
  [querySpotifyCatalog.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      searchResults: {
        tracks: payload?.tracks?.items || [],
        albums: payload?.albums?.items || [],
        artists: payload?.artists?.items || [],
      }
    };
  },
};
