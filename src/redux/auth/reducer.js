import { requestSpotifyToken, refreshSpotifyToken } from './actions';
import * as appActions from '../app/actions';
import { logout } from '../login/actions';
import { TokenOwner } from '../../constants';
import { getExpirationMs } from '../../utils/auth';

// Auth reducer

export const initialState = {
  accessToken: '',
  tokenType: '',
  expiresIn: 0,
  expirationMs: 0,
  refreshToken: '',
  scope: '',
  error: null,
  spotifyState: '',
};

export const reducer = {
  saveSpotifyState: (state, action) => {
    return {
      ...state,
      spotifyState: action.payload,
    }
  },
};

export const extraReducer = {
  [logout]: _ => initialState,
  [appActions.loadReduxState]: (state, action) => ({
    ...state,
    ...action.payload?.auth,
  }),
  [requestSpotifyToken.fulfilled]: (state, action) => ({
    ...state,
    accessToken: action.payload?.access_token,
    tokenType: action.payload?.token_type,
    expiresIn: action.payload?.expires_in,
    expirationMs: getExpirationMs(action.payload?.expires_in),
    refreshToken: action.payload?.refresh_token,
    scope: action.payload?.scope,
    error: null,
  }),
  [requestSpotifyToken.rejected]: (state, action) => ({
    ...state, 
    error: {
      reason: action.payload?.error,
      description: action.payload?.error_description,
    },
  }),
  [refreshSpotifyToken.fulfilled]: (state, action) => {
    const { payload } = action;
    const { tokenOwner } = payload;
    if (tokenOwner !== TokenOwner.user) {
      return state;
    }

    return {
      ...state,
      accessToken: action.payload?.access_token,
      tokenType: action.payload?.token_type,
      expiresIn: action.payload?.expires_in,
      expirationMs: getExpirationMs(action.payload?.expires_in),
      scope: action.payload?.scope,
      error: null,
    };
  },
};
