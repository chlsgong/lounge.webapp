import { unwrapResult } from '@reduxjs/toolkit';
import { TokenOwner } from '../constants';

import { refreshSpotifyToken } from '../redux/auth/actions';
import { selectAccessToken, selectExpirationMs } from '../redux/auth/selectors';
import { selectActiveLoungeAccessToken, selectActiveLoungeExpirationMs } from '../redux/lounge/selectors';

// Not 100% accurate but close enough
export const getExpirationMs = expiresIn => {
  if (!expiresIn) return 0;

  const current = Date.now();
  const expiresInMs = expiresIn * 1000;
  return current + expiresInMs;
};

/**
 * Checks token expiration.
 * If expired then refresh the token.
 * Otherwise just pass it to the callback.
 */
export const refreshIfNeeded = async (thunkAPI, callback, tokenOwner = TokenOwner.lounge) => {
  const state = thunkAPI.getState();
  const expirationMs = tokenOwner === TokenOwner.user
    ? selectExpirationMs(state)
    : selectActiveLoungeExpirationMs(state);
  const padding = 1000;

  // Includes padding to make sure the token doesn't expire during execution
  if (Date.now() > (expirationMs - padding)) {
    let callbackResult;
    await thunkAPI.dispatch(refreshSpotifyToken(tokenOwner))
      .then(unwrapResult)
      .then(async result => {
        const accessToken = result?.access_token;
        callbackResult = await callback(accessToken);
      });
    return callbackResult;
  }
  else {
    const accessToken = tokenOwner === TokenOwner.user
      ? selectAccessToken(state)
      : selectActiveLoungeAccessToken(state);
    return await callback(accessToken);
  }
};
