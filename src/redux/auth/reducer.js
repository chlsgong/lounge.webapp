import _ from 'lodash';

import { requestSpotifyToken } from './actions';

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
  [requestSpotifyToken.fulfilled]: (state, action) => ({
    ...state,
    accessToken: _.get(action.payload, 'access_token'),
    tokenType: _.get(action.payload, 'token_type'),
    expiresIn: _.get(action.payload, 'expires_in'),
    refreshToken: _.get(action.payload, 'refresh_token'),
    scope: _.get(action.payload, 'scope'),
    error: null,
  }),
  [requestSpotifyToken.rejected]: (state, action) => ({
    ...state,
    error: {
      reason: _.get(action.payload, 'error'),
      description: _.get(action.payload, 'error_description'),
    },
  }),
};
