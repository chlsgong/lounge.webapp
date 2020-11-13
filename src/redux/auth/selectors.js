export const selectAuth = state => state.auth;
export const selectRefreshToken = state => selectAuth(state).refreshToken;
export const selectAccessToken = state => selectAuth(state).accessToken;
export const selectExpirationMs = state => selectAuth(state).expirationMs;
export const selectSpotifyState = state => selectAuth(state).spotifyState;
