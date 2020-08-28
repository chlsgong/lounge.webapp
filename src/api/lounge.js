import config from '../config';
import { createInstance, createPostRequest, createGetRequest } from '../utils/api';

const lounge = {
  url: config.server.URL,
  user: '/user',
};

const loungeInstance = createInstance({ baseURL: lounge.url });

export const getUser = spotifyId => {
  return createGetRequest(
    {
      url: lounge.user,
      config: {
        params: {
          spotify_id: spotifyId,
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
