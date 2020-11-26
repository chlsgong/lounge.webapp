import { selectPlayer } from './selectors';
import { retrieveRecentlyPlayed } from '../spotify/actions';
import { createActionMap } from '../../utils/redux';

const handleRetrieveRecentlyPlayed = store => {
  const state = store.getState();
  const { weblink } = selectPlayer(state);

  window.location.href = weblink;
};

const actionMap = createActionMap({
  [retrieveRecentlyPlayed.fulfilled]: handleRetrieveRecentlyPlayed, 
});

const playerMiddleware = store => next => action => {
  const result = next(action);

  const handler = actionMap[action.type];
  if (handler) {
    handler(store, action.payload);
  }

  return result;
};

export default playerMiddleware;
