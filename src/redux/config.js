import { requestSpotifyToken, refreshSpotifyToken } from './auth/actions';
import { saveSpotifyState } from './auth/extraActions';
import { logout } from './login/actions';

export const persistence = {
  // Redux actions that causes the state to be saved
  whitelist: [
    requestSpotifyToken.fulfilled.toString(),
    refreshSpotifyToken.fulfilled.toString(),
    saveSpotifyState.toString(),
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
    ['auth', 'spotifyState'],
    ['login', 'isLoggedIn'],
  ],
};
