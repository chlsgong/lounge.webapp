import config from '../config';
import { createInstance, createPostRequest, createGetRequest } from '../utils/api';

const lounge = {
  url: config.server.URL,
  user: '/user',
  lounge: {
    base: '/lounge',
    open: '/lounge/open',
    close: '/lounge/close',
    join: '/lounge/join',
  },
};

const loungeInstance = createInstance({ baseURL: lounge.url });

export const getUser = ({ spotifyId, userId }) => {
  return createGetRequest(
    {
      url: lounge.user,
      config: {
        params: {
          spotify_id: spotifyId,
          user_id: userId,
        },
      },
    },
    loungeInstance,
  );
};

export const createUser = spotifyId => {
  return createPostRequest(
    {
      url: lounge.user,
      body: {
        spotify_id: spotifyId,
      },
    },
    loungeInstance,
  );
};

export const createLounge = ({ hostId, name, code, refreshToken }) => {
  return createPostRequest(
    {
      url: lounge.lounge.base,
      body: {
        host_id: hostId,
        name: name,
        code: code,
        refresh_token: refreshToken,
      },
    },
    loungeInstance,
  );
};

export const getLounge = loungeId => {
  return createGetRequest(
    {
      url: lounge.lounge.base,
      config: {
        params: {
          lounge_id: loungeId,
        },
      },
    },
    loungeInstance,
  );
};

export const openLounge = ({ userId, loungeId }) => {
  return createPostRequest(
    {
      url: lounge.lounge.open,
      body: {
        user_id: userId,
        lounge_id: loungeId,
      },
    },
    loungeInstance,
  )
};

export const closeLounge = ({ userId, loungeId }) => {
  return createPostRequest(
    {
      url: lounge.lounge.close,
      body: {
        user_id: userId,
        lounge_id: loungeId,
      }
    },
    loungeInstance,
  )
};

export const joinLounge = code => {
  return createGetRequest(
    {
      url: lounge.lounge.join,
      config: {
        params: {
          code: code,
        },
      },
    },
    loungeInstance,
  )
};
