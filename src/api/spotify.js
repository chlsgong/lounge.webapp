import config from '../config';
import { createInstance, createPostRequest } from '../utils/api';
import { createURLQuery } from '../utils/url';

const spotify = {
  url: 'https://accounts.spotify.com',
  api: {
    token: '/api/token',
  },
  authorize: {
    root: '/authorize',
  },
};

const spotifyInstance = createInstance({ baseURL: spotify.url });

export const getSpotifyAuthorize = () => {
  const params = {
    'client_id': '16efad44cfd54e3ea050d602af68eadd',
    'response_type': 'code',
    'redirect_uri': config.spotify.REDIRECT_URI,
    'state': 'thisisthecorrectapp12345678',
    'scope': ['streaming', 'user-read-email', 'user-read-private'].join(' '),
  }
  const url = spotify.url + spotify.authorize.root + createURLQuery(params);

  return url;
};

export const postSpotifyToken = (code) => {
  return createPostRequest(
    {
      url: spotify.api.token,
      body: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.spotify.REDIRECT_URI,
        client_id: '16efad44cfd54e3ea050d602af68eadd', // TODO: use config file
        client_secret: '10f26b66944143449acf95adcc4074bb',
      },
    },
    spotifyInstance,
  );
};
