export const selectAuth = state => state.auth;
export const selectAccessToken = state => selectAuth(state).accessToken;
