import qs from 'qs';

import config from '../config';
import { createInstance, createPostRequest, createGetRequest, getAuthHeader } from '../utils/api';
import { createURLQuery } from '../utils/url';

const spotify = {
  accounts: {
    url: 'https://accounts.spotify.com',
    api: {
      token: '/api/token',
    },
    authorize: '/authorize',
  },
  api: {
    url: 'https://api.spotify.com',
    v1: {
      me: '/v1/me',
      player: '/v1/me/player',
      queue: '/v1/me/player/queue',
      search: '/v1/search',
    },
  },
};

const spotifyAccounts = createInstance({ baseURL: spotify.accounts.url });
const spotifyAPI = createInstance({ baseURL: spotify.api.url });

export const getSpotifyAuthorize = () => {
  const params = {
    'client_id': '16efad44cfd54e3ea050d602af68eadd',
    'response_type': 'code',
    'redirect_uri': config.spotify.REDIRECT_URI,
    'state': 'thisisthecorrectapp12345678',
    'scope': ['streaming', 'user-read-email', 'user-read-private'].join(' '),
  }
  const url = spotify.accounts.url + spotify.accounts.authorize + createURLQuery(params);

  return url;
};

export const postSpotifyToken = code => {
  return createPostRequest(
    {
      url: spotify.accounts.api.token,
      body: qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.spotify.REDIRECT_URI,
        client_id: '16efad44cfd54e3ea050d602af68eadd', // TODO: use config file
        client_secret: '10f26b66944143449acf95adcc4074bb',
      }),
      config: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    },
    spotifyAccounts,
  );
};

export const postRefreshSpotifyToken = refreshToken => {
  const encodedString = btoa('16efad44cfd54e3ea050d602af68eadd:10f26b66944143449acf95adcc4074bb');

  return createPostRequest(
    {
      url: spotify.accounts.api.token,
      body: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${encodedString}`,
        },
      },
    },
    spotifyAccounts,
  );
};

export const getSpotifyUserProfile = token => {
  return createGetRequest(
    {
      url: spotify.api.v1.me,
      config: {
        headers: getAuthHeader(token),
      },
    },
    spotifyAPI,
  );
};

export const querySpotify = (token, queryString) => {
  return createGetRequest(
    {
      url: spotify.api.v1.search,
      config: {
        headers: getAuthHeader(token),
        params: {
          q: encodeURI(queryString),
          type: 'track',
        },
      },
    },
    spotifyAPI,
  );
};

export const postAddToSpotifyQueue = (token, uri) => {
  return createPostRequest(
    {
      url: spotify.api.v1.queue,
      config: {
        headers: getAuthHeader(token),
        params: {
          uri
        },
      },
    },
    spotifyAPI,
  );
};
