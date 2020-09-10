import { querySpotifyCatalog } from './actions';

// Spotify reducer

export const initialState = {
  searchResults: [],
};

export const extraReducer = {
  [querySpotifyCatalog.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      searchResults: payload?.tracks?.items,
    };
  },
};
