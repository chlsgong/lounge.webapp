export const selectSpotify = state => state.spotify;
export const selectSpotifySearchResults = state => selectSpotify(state).searchResults;
