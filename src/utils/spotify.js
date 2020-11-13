export const isVerifiedSpotifyApp = (code, state, spotifyState) => {
  return code && state === spotifyState;
}
