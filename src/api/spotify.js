import qs from 'qs';

import config from '../config';
import { createInstance, createPostRequest, createGetRequest, createPutRequest, getAuthHeader } from '../utils/api';
import { createURLQuery, appendURLPathParam } from '../utils/url';

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
      artists: '/v1/artists',
      albums: '/v1/albums',
    },
  },
};

const spotifyAccounts = createInstance({ baseURL: spotify.accounts.url });
const spotifyAPI = createInstance({ baseURL: spotify.api.url });

export const getSpotifyAuthorize = spotifyState => {
  const params = {
    'client_id': config.spotify.CLIENT_ID,
    'response_type': 'code',
    'redirect_uri': config.spotify.REDIRECT_URI,
    'state': spotifyState,
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
        client_id: config.spotify.CLIENT_ID,
        client_secret: config.spotify.CLIENT_SECRET,
      }),
      config: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    },
    spotifyAccounts,
  );
};

export const postRefreshSpotifyToken = refreshToken => {
  const encodedAuth = btoa(`${config.spotify.CLIENT_ID}:${config.spotify.CLIENT_SECRET}`);

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
          'Authorization': `Basic ${encodedAuth}`,
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

export const querySpotify = (token, queryString, limit) => {
  return createGetRequest(
    {
      url: spotify.api.v1.search,
      config: {
        headers: getAuthHeader(token),
        params: {
          q: queryString,
          type: 'track,album,artist',
          limit: limit,
          // offset: offset,
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

export const transferPlayback = (token, deviceId, autoPlay) => {
  return createPutRequest(
    {
      url: spotify.api.v1.player,
      body: {
        device_ids: [ deviceId ],
        play: autoPlay,
      },
      config: {
        headers: getAuthHeader(token),
      },
    },
    spotifyAPI,
  );
};

export const getSpotifyArtist = (token, artistId) => {
  return createGetRequest(
    {
      url: appendURLPathParam(spotify.api.v1.artists, [artistId]),
      config: {
        headers: getAuthHeader(token),
      },
    },
    spotifyAPI,
  );
};

export const getSpotifyArtistAlbums = (token, artistId) => {
  return createGetRequest(
    {
      url: appendURLPathParam(spotify.api.v1.artists, [artistId, 'albums']),
      config: {
        headers: getAuthHeader(token),
        params: {
          include_groups: 'album',
        },
      },
    },
    spotifyAPI,
  );
};

export const getSpotifyArtistTopTracks = (token, artistId) => {
  return createGetRequest(
    {
      url: appendURLPathParam(spotify.api.v1.artists, [artistId, 'top-tracks']),
      config: {
        headers: getAuthHeader(token),
        params: {
          country: 'from_token',
        },
      },
    },
    spotifyAPI,
  );
};

export const getSpotifyAlbumTracks = (token, albumId) => {
  return createGetRequest(
    {
      url: appendURLPathParam(spotify.api.v1.albums, [albumId, 'tracks']),
      config: {
        headers: getAuthHeader(token),
        params: {
          limit: '50', // TODO: should implement paging
        },
      },
    },
    spotifyAPI,
  );
};
