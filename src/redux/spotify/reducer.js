import {
  querySpotifyCatalog,
  retrieveSpotifyArtist,
  retrieveSpotifyArtistAlbums,
  retrieveSpotifyArtistTopTracks,
  retrieveSpotifyAlbumTracks,
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
        ...state.selectedArtist,
        id: payload?.id,
        images: payload?.images,
        name: payload?.name,
      },
    };
  },
  [retrieveSpotifyArtistAlbums.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      selectedArtist: {
        ...state.selectedArtist,
        albums: payload?.items || [],
      },
    };
  },
  [retrieveSpotifyArtistTopTracks.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      selectedArtist: {
        ...state.selectedArtist,
        topTracks: payload?.tracks || [],
      },
    };
  },
  [retrieveSpotifyAlbumTracks.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      selectedAlbum: {
        tracks: payload?.items || [],
      },
    };
  },
};
