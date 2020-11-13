import { v4 as uuidv4 } from 'uuid';
import authSlice from './slice';

const { actions } = authSlice;

export const { saveSpotifyState } = actions;

export const generateSpotifyState = dispatch => {
  const spotifyState = `LoungeWebapp-${uuidv4()}`;
  dispatch(saveSpotifyState(spotifyState));
};
