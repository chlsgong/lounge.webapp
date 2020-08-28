import qs from 'qs';

import config from '../config';
import { createInstance, createPostRequest, createGetRequest, getAuthHeader } from '../utils/api';
import { createURLQuery } from '../utils/url';

const spotify = {
  url: 'https://accounts.spotify.com',
  api: {
    token: '/api/token',
  },
  authorize: {
    root: '/authorize',
  },
  v1: {
    me: '/v1/me',
    player: '/v1/me/player',
    queue: '/v1/me/player/queue',
  }
  // https://api.spotify.com
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

export const postSpotifyToken = code => {
  return createPostRequest(
    {
      url: spotify.api.token,
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
    spotifyInstance,
  );
};

export const getSpotifyUserProfile = token => {
  return createGetRequest(
    {
      url: spotify.v1.me, // WTFFFF
      // url: 'https://api.spotify.com/v1/me',
      config: {
        headers: getAuthHeader(token),
      },
    },
    spotifyInstance,
  );

  // fetch("https://api.spotify.com/v1/me", {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(spotifyProfile => {
  //       console.log('success', spotifyProfile);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
};
