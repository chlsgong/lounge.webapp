import config from '../config';
import { createPostRequest } from '../utils/api';

export const postSpotifyToken = (code) => {
  return createPostRequest(
    {
      url: 'https://accounts.spotify.com/api/token', // TODO: use constant
      body: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.spotify.REDIRECT_URI,
        client_id: '16efad44cfd54e3ea050d602af68eadd', // TODO: use config file
        client_secret: '10f26b66944143449acf95adcc4074bb',
      },
    }
  );
};
