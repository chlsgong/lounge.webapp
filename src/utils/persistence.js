import _ from 'lodash';

import { buildObject } from './common';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error loading from local storage');
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('Error saving state to local storage'); 
  }
};

export const persist = (reduxState, whitelistStates) => {
  let persistentState = {};
  
  // Build state
  whitelistStates.forEach(propPath => {
    const propSelector = _.reduce(
      propPath,
      (result, prop) => {
        if (!result) return prop;
        return `${result}.${prop}`;
      },
      '',
    );

    const value = _.get(reduxState, propSelector);
    const propObject = buildObject(propPath, value);

    persistentState = _.merge(persistentState, propObject);
  });

  // Persist
  saveState(persistentState);
};
