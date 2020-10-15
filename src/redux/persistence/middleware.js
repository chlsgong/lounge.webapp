import _ from 'lodash';
import { persistence } from '../config';
import * as appActions from '../app/actions';
import { createActionMap } from '../../utils/redux';
import { loadState, saveState } from '../../utils/persistence';

// TODO: move to utils/common
const buildObject = (props, value) => {
  if (props.length === 0) {
    return value;
  }

  const prop = _.head(props);
  const nextProps = _.drop(props, 1);

  return { [`${prop}`]: buildObject(nextProps, value) };
};

// TOOD: move to utils/persistence
const persist = store => {
  let persistentState = {};
  
  // Build state
  persistence.whitelistStates.forEach(propPath => {
    const propSelector = _.reduce(
      propPath,
      (result, prop) => {
        if (!result) return prop;
        return `${result}.${prop}`;
      },
      '',
    );

    const value = _.get(store.getState(), propSelector);
    const propObject = buildObject(propPath, value);

    persistentState = _.merge(persistentState, propObject);
  });

  // Persist
  saveState(persistentState);
};

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
    persist(store);
  }

  return result;
};

export default persistenceMiddleware;
