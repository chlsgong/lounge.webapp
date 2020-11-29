import {
  createLoungeRoom,
  joinLoungeRoom,
  getLoungeRoom,
  openLoungeRoom,
  closeLoungeRoom
} from './actions';
import { selectActiveLoungeRoomId } from './selectors';
import { refreshSpotifyToken } from '../auth/actions';
import { requestLoungeUser } from '../user/actions';
import { retrieveCurrentlyPlaying } from '../spotify/actions';
import { selectIsBrowser } from '../app/selectors';
import { selectId } from '../user/selectors';
import { TokenOwner } from '../../constants';
import { createActionMap } from '../../utils/redux';
import { connect, openRoom, joinRoom, closeRoom } from '../../socket';

let retrieveCurrentlyPlayingInterval = null;

const handleCreateLoungeRoomSuccess = store => {
  const state = store.getState();
  const userId = selectId(state);
  store.dispatch(requestLoungeUser({ userId }));
};

const handleJoinLoungeRoomSuccess = store => {
  const state = store.getState();
  const loungeId = selectActiveLoungeRoomId(state);
  store.dispatch(getLoungeRoom(loungeId));

  connect(store.dispatch);
  joinRoom(loungeId);
};

const handleGetLoungeRoomSuccess = store => {
  const state = store.getState();
  const loungeId = selectActiveLoungeRoomId(state);
  const isBrowser = selectIsBrowser(state);
  store.dispatch(refreshSpotifyToken(TokenOwner.lounge));

  if (!isBrowser) {
    // Initial pull
    store.dispatch(retrieveCurrentlyPlaying());
    // Set polling
    retrieveCurrentlyPlayingInterval = setInterval(() => store.dispatch(retrieveCurrentlyPlaying()), 8000);
  }

  connect(store.dispatch);
  joinRoom(loungeId);
};

const handleOpenLoungeRoomSuccess = (store, payload) => {
  const loungeId = payload?.loungeId;
  store.dispatch(getLoungeRoom(loungeId));

  connect(store.dispatch);
  openRoom(loungeId);
};

const handleCloseLoungeRoomSuccess = store => {
  const state = store.getState();
  const loungeId = selectActiveLoungeRoomId(state);

  clearInterval(retrieveCurrentlyPlayingInterval);

  closeRoom(loungeId);
};

const actionMap = createActionMap({
  [createLoungeRoom.fulfilled]: handleCreateLoungeRoomSuccess,
  [joinLoungeRoom.fulfilled]: handleJoinLoungeRoomSuccess,
  [getLoungeRoom.fulfilled]: handleGetLoungeRoomSuccess,
  [openLoungeRoom.fulfilled]: handleOpenLoungeRoomSuccess,
  [closeLoungeRoom.pending]: handleCloseLoungeRoomSuccess,
});

const loungeMiddleware = store => next => action => {
  const result = next(action);

  const handler = actionMap[action.type];
  if (handler) {
    handler(store, action.payload);
  }

  return result;
};

export default loungeMiddleware;
