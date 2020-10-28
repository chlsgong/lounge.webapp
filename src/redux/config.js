import { requestSpotifyToken } from './auth/actions';
import { logout } from './login/actions';

export const persistence = {
  // Redux actions that causes the state to be saved
  whitelist: [
    requestSpotifyToken.fulfilled.toString(),
    logout.toString(),
  ],
  // Values of the redux state to be saved
  whitelistStates: [
    ['auth', 'accessToken'],
    ['auth', 'tokenType'],
    ['auth', 'expiresIn'],
    ['auth', 'expirationMs'],
    ['auth', 'refreshToken'],
    ['auth', 'scope'],
    ['login', 'isLoggedIn'],
  ],
};
