import { createLoungeRoom, joinLoungeRoom, getLoungeRoom } from './actions';
import { selectActiveLoungeRoomId } from './selectors';
import { refreshSpotifyToken } from '../auth/actions';
import { requestLoungeUser } from '../user/actions';
import { selectId } from '../user/selectors';
import { createActionMap } from '../../utils/redux';

const handleCreateLoungeRoomSuccess = store => {
  const state = store.getState();
  const userId = selectId(state);
  store.dispatch(requestLoungeUser({ userId }));
};

const handleJoinLoungeRoomSuccess = store => {
  const state = store.getState();
  const loungeId = selectActiveLoungeRoomId(state);
  store.dispatch(getLoungeRoom(loungeId));
};

const handleGetLoungeRoomSuccess = store => {
  store.dispatch(refreshSpotifyToken());
};

const actionMap = createActionMap({
  [createLoungeRoom.fulfilled]: handleCreateLoungeRoomSuccess,
  [joinLoungeRoom.fulfilled]: handleJoinLoungeRoomSuccess,
  [getLoungeRoom.fulfilled]: handleGetLoungeRoomSuccess,
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
