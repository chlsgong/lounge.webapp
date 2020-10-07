export const selectSpotify = state => state.spotify;

export const selectTrackSearchResults = state => selectSpotify(state).searchResults.tracks;
export const selectAlbumSearchResults = state => selectSpotify(state).searchResults.albums;
export const selectArtistSearchResults = state => selectSpotify(state).searchResults.artists;

export const selectSelectedArtist = state => selectSpotify(state).selectedArtist;
export const selectSelectedArtistAlbums = state => selectSelectedArtist(state).albums;
export const selectSelectedArtistTopTracks = state => selectSelectedArtist(state).topTracks;

export const selectSelectedAlbum = state => selectSpotify(state).selectedAlbum;
export const selectSelectedAlbumTracks = state => selectSelectedAlbum(state).tracks;
