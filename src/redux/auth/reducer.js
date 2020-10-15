import { requestSpotifyToken } from './actions';
import * as appActions from '../app/actions';

// Auth reducer

export const initialState = {
  accessToken: '',
  tokenType: '',
  expiresIn: 0,
  refreshToken: '',
  scope: '',
  error: null,
};

export const reducer = {};

export const extraReducer = {
  [appActions.loadReduxState]: (state, action) => ({
    ...state,
    ...action.payload?.auth,
  }),
  [requestSpotifyToken.fulfilled]: (state, action) => ({
    ...state,
    accessToken: action.payload?.access_token,
    tokenType: action.payload?.token_type,
    expiresIn: action.payload?.expires_in,
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
};
