export const selectUser = state => state.user;
export const selectSpotifyId = state => selectUser(state).id;
