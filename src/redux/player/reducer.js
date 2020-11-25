import _ from 'lodash';
import { retrieveCurrentlyPlaying, play, pause } from '../spotify/actions';

// Player reducer

export const initialState = {
  trackName: '',
  albumName: '',
  artistName: '',
  albumImage: {
    url: '',
    width: 0,
    height: 0,
  },
  playing: false,
  isCurrentTrackEmpty: true,
};

export const reducer = {
  updatePlayer: (state, action) => {
    return {
      ...state,
      ...action.payload,
      isCurrentTrackEmpty: false,
    }
  },
};

export const extraReducer = {
  [retrieveCurrentlyPlaying.fulfilled]: (state, action) => {
    const { payload } = action;
    
    // if no current track return initial state
    if (!payload) {
      return initialState;
    }

    const currentTrack = payload?.item;

    // get track info
    const trackName = currentTrack?.name;
    const albumName = currentTrack?.album?.name;
    const artistName = currentTrack?.artists?.map(artist => artist?.name).join(', ');
    const albumImage = _.get(currentTrack, 'album.images[1]');

    // get track state
    const playing = payload?.is_playing || initialState.playing;

    return {
      ...state,
      trackName,
      albumName,
      artistName,
      albumImage,
      playing,
      isCurrentTrackEmpty: false,
    };
  },
  [play.fulfilled]: state => {
    return {
      ...state,
      playing: true,
    };
  },
  [pause.fulfilled]: state => {
    return {
      ...state,
      playing: false,
    };
  },
};
