import { selectActiveLoungeAccessToken } from '../redux/lounge/selectors';

export const createActionMap = (actionMap) => {
  let mapping = {};

  /* NOTE: not the most efficient way to handle this, but there will
   * only be a constant number of actions so this shouldn't be an issue.
   */
  for (let action in actionMap) {
    mapping[action.toString()] = actionMap[action];
  }

  return mapping;
};

export const passToken = (thunkAPI, callback) => {
  const state = thunkAPI.getState();
  const accessToken = selectActiveLoungeAccessToken(state);
  return callback(accessToken);
};
