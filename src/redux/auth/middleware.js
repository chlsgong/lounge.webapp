import { saveSpotifyState } from './extraActions';
import { getSpotifyAuthorize } from '../../api/spotify';
import { createActionMap } from '../../utils/redux';

const handleSaveSpotifyState = (_, payload) => {
  if (payload) {
    window.location.href = getSpotifyAuthorize(payload);
  }
};

const actionMap = createActionMap({
  [saveSpotifyState]: handleSaveSpotifyState,
});

const authMiddleware = store => next => action => {
  const result = next(action);

  const handler = actionMap[action.type];
  if (handler) {
    handler(store, action.payload);
  }

  return result;
};

export default authMiddleware;
