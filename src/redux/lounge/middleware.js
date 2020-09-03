import { createLoungeRoom } from './actions';
import { requestLoungeUser } from '../user/actions';
import { selectId } from '../user/selectors';
import { createActionMap } from '../../utils/redux';

const handleCreateLoungeRoomSuccess = store => {
  const state = store.getState();
  const userId = selectId(state);
  store.dispatch(requestLoungeUser({ userId }));
};

const actionMap = createActionMap({
  [createLoungeRoom.fulfilled]: handleCreateLoungeRoomSuccess,
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
