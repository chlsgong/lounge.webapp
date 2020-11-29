import { selectPlayer } from './selectors';
import {
  retrieveRecentlyPlayed,
  retrieveCurrentlyPlaying,
  playPrevious,
  playNext,
} from '../spotify/actions';
import { createActionMap } from '../../utils/redux';

const handleRetrieveRecentlyPlayed = store => {
  const state = store.getState();
  const { weblink } = selectPlayer(state);

  window.location.href = weblink;
};

const handleSpotifyPlayerAction = store => {
  store.dispatch(retrieveCurrentlyPlaying());
};

const actionMap = createActionMap({
  [retrieveRecentlyPlayed.fulfilled]: handleRetrieveRecentlyPlayed,
  [playPrevious.fulfilled]: handleSpotifyPlayerAction,
  [playNext.fulfilled]: handleSpotifyPlayerAction,
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
