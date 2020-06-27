import { requestSpotifyToken } from '../auth/actions';

// Login reducer

export const initialState = {
  isLoggedIn: false,
};

export const reducer = {
  logout: _ => initialState,
};

export const extraReducer = {
  [requestSpotifyToken.fulfilled]: state => ({
    ...state,
    isLoggedIn: true,
  }),
  [requestSpotifyToken.rejected]: _ => initialState,
};
