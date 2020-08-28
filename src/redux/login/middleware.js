import * as appActions from '../app/actions';
import * as authActions from '../auth/actions';
import { createActionMap } from '../../utils/redux';
import { getURLParams } from '../../utils/url';
import { isVerifiedSpotifyApp } from '../../utils/spotify';

const handleInitWebApp = store => {
  const { code, state } = getURLParams(window.location.search);

  if (isVerifiedSpotifyApp(code, state)) {
    store.dispatch(authActions.requestSpotifyToken({ code }));
  }
};

const actionMap = createActionMap({
  [appActions.initWebApp]: handleInitWebApp,
});

const loginMiddleware = store => next => action => {
  const result = next(action);

  const handler = actionMap[action.type];
  if (handler) {
    handler(store, action.payload);
  }

  return result;
};

export default loginMiddleware;
