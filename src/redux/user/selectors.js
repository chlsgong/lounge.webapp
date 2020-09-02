export const selectUser = state => state.user;
export const selectId = state => selectUser(state).id;
export const selectSpotifyId = state => selectUser(state).spotify.id;
