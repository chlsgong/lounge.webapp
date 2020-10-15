import { requestSpotifyToken } from '../auth/actions';
import * as appActions from '../app/actions';

// Login reducer

export const initialState = {
  isLoggedIn: false,
};

export const reducer = {
  logout: _ => initialState,
};

export const extraReducer = {
  [appActions.loadReduxState]: (state, action) => ({
    ...state,
    ...action.payload?.login,
  }),
  [requestSpotifyToken.fulfilled]: state => ({
    ...state,
    isLoggedIn: true,
  }),
  [requestSpotifyToken.rejected]: _ => initialState,
};
