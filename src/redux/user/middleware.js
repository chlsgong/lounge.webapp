import { requestSpotifyUserProfile, requestLoungeUser, createLoungeUser } from './actions';
import { selectSpotifyId } from './selectors';
import { requestSpotifyToken } from '../auth/actions';
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
  const { reason } = payload;
  if (reason === 'spotifyUserNotFound') {
    const state = store.getState();
    const spotifyId = selectSpotifyId(state);
    store.dispatch(createLoungeUser(spotifyId));
  }
};

const actionMap = createActionMap({
  [requestSpotifyToken.fulfilled]: handleLogInSuccess,
  [requestSpotifyUserProfile.fulfilled]: handleGetSpotifyProfileSuccess,
  // [requestLoungeUser.fulfilled]: handleGetLoungeUserSuccess,
  [requestLoungeUser.rejected]: handleGetLoungeUserFailure,
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
