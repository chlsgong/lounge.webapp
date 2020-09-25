import {
  querySpotifyCatalog,
  retrieveSpotifyArtist,
  retrieveSpotifyArtistAlbums,
  retrieveSpotifyArtistTopTracks
} from './actions';

// Spotify reducer

export const initialState = {
  searchResults: {
    tracks: [],
    albums: [],
    artists: [],
  },
  selectedArtist: {
    id: '',
    images: [],
    name: '',
    type: '',
    albums: [],
    topTracks: [],
  },
  selectedAlbum: {
    tracks: [],
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
      },
    };
  },
  [retrieveSpotifyArtist.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      selectedArtist: {
        
      },
    };
  },
};
