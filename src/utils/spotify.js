import config from '../config';

// TODO: move to api/spotify
export const getSpotifyAuthorizationAPI = () => {
  const authorizeAPI = 'https://accounts.spotify.com/authorize'
  const clientId = '?client_id=16efad44cfd54e3ea050d602af68eadd';
  const responseType = '&response_type=code';
  const redirectURI = `&redirect_uri=${config.spotify.REDIRECT_URI}`;
  const state = '&state=thisisthecorrectapp12345678';
  const scope = `&scope=${["streaming", "user-read-email", "user-read-private"].join('%20')}`;

  return authorizeAPI + clientId + responseType + redirectURI + state + scope;
}

export const isVerifiedSpotifyApp = (code, state) => {
  return code && state === 'thisisthecorrectapp12345678';
}
