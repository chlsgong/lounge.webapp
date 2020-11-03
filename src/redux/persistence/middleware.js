import _ from 'lodash';
import { persistence } from '../config';
import * as appActions from '../app/actions';
import { createActionMap } from '../../utils/redux';
import { loadState, persist } from '../../utils/persistence';

const handleInitWebApp = store => {
  const loadedState = loadState();
  store.dispatch(appActions.loadReduxState(loadedState));
};

const actionMap = createActionMap({
  [appActions.initWebApp]: handleInitWebApp,
});

const persistenceMiddleware = store => next => action => {
  const result = next(action);

  const handler = actionMap[action.type];
  if (handler) {
    handler(store, action.payload);
  }

  if (_.includes(persistence.whitelist, action.type)) {
    persist(store.getState(), persistence.whitelistStates);
  }

  return result;
};

export default persistenceMiddleware;
