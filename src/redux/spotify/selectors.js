export const selectSpotify = state => state.spotify;
export const selectTrackSearchResults = state => selectSpotify(state).searchResults.tracks;
export const selectAlbumSearchResults = state => selectSpotify(state).searchResults.albums;
export const selectArtistSearchResults = state => selectSpotify(state).searchResults.artists;
