import config from '../config';
import { createInstance, createPostRequest, createGetRequest } from '../utils/api';

const lounge = {
  url: config.server.URL,
  user: '/user',
  lounge: '/lounge',
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
      url: lounge.lounge,
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

