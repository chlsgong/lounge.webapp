import { requestSpotifyUserProfile, requestLoungeUser, createLoungeUser } from './actions';
import { selectSpotifyId } from './selectors';
import { requestSpotifyToken } from '../auth/actions';
import { selectAccessToken } from '../auth/selectors';
import * as appActions from '../app/actions';
import { createActionMap } from '../../utils/redux';

const handleLogInSuccess = store => {
  store.dispatch(requestSpotifyUserProfile());
};

const handleGetSpotifyProfileSuccess = store => {
  const state = store.getState();
  const spotifyId = selectSpotifyId(state);
  store.dispatch(requestLoungeUser({ spotifyId }));
};

// const handleGetLoungeUserSuccess = store => {
//   // Success
// };

const handleGetLoungeUserFailure = (store, payload) => {
  const reason = payload?.reason;
  if (reason === 'spotifyUserNotFound') {
    const state = store.getState();
    const spotifyId = selectSpotifyId(state);
    store.dispatch(createLoungeUser(spotifyId));
  }
};

const handleLoadReduxStore = store => {
  const state = store.getState();
  const accessToken = selectAccessToken(state);
  
  if (accessToken) {
    store.dispatch(requestSpotifyUserProfile());
  }
};

const actionMap = createActionMap({
  // Should be in auth middleware, but here is fine now
  [requestSpotifyToken.fulfilled]: handleLogInSuccess,
  [requestSpotifyUserProfile.fulfilled]: handleGetSpotifyProfileSuccess,
  // [requestLoungeUser.fulfilled]: handleGetLoungeUserSuccess,
  [requestLoungeUser.rejected]: handleGetLoungeUserFailure,
  [appActions.loadReduxState]: handleLoadReduxStore,
});

const userMiddleware = store => next => action => {
  const result = next(action);

  const handler = actionMap[action.type];
  if (handler) {
    handler(store, action.payload);
  }

  return result;
};

export default userMiddleware;
