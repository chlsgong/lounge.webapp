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
import { selectId } from '../user/selectors';
import { TokenOwner } from '../../constants';
import { createActionMap } from '../../utils/redux';
import { connect, openRoom, joinRoom, closeRoom } from '../../socket';

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
  store.dispatch(refreshSpotifyToken(TokenOwner.lounge));

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
