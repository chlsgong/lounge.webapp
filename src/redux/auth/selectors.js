export const selectAuth = state => state.auth;
export const selectRefreshToken = state => selectAuth(state).refreshToken;
export const selectAccessToken = state => selectAuth(state).accessToken;
