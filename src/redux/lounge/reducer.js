import { openLoungeRoom, closeLoungeRoom, joinLoungeRoom, getLoungeRoom } from './actions';
import { refreshSpotifyToken } from '../auth/actions';
import { requestLoungeUser } from '../user/actions';
import { TokenOwner } from '../../constants';
import { getExpirationMs } from '../../utils/auth';

// Lounge reducer

export const initialState = {
  rooms: [],
  activeRoom: {
    id: '',
    loungeId: '',
    hostId: '',
    name: '',
    code: '',
    auth: {
      refreshToken: '',
      accessToken: '',
      expiresIn: 0,
      expirationMs: 0,
    }
  },
  isJoining: false,
  errorJoining: false,
};

export const reducer = {
  loungeClosed: state => {
    return {
      ...state,
      activeRoom: initialState.activeRoom,
    }
  },
};

export const extraReducer = {
  [requestLoungeUser.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      rooms: payload?.lounges,
      activeRoom: {
        ...state.activeRoom,
        loungeId: payload?.activeLoungeId,
      },
    };
  },
  [openLoungeRoom.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      activeRoom: {
        ...state.activeRoom,
        ...payload,
        id: payload?._id, // TODO: remove this once fixed on server side
      },
    };
  },
  [closeLoungeRoom.fulfilled]: state => {
    return {
      ...state,
      activeRoom: initialState.activeRoom,
    };
  },
  [joinLoungeRoom.pending]: state => {
    return {
      ...state,
      isJoining: true,
      errorJoining: false,
    };
  },
  [joinLoungeRoom.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      activeRoom: {
        ...state.activeRoom,
        ...payload,
        id: payload?._id, // TODO: remove this once fixed on server side
      },
      isJoining: false,
      errorJoining: false,
    };
  },
  [joinLoungeRoom.rejected]: state => {
    return {
      ...state,
      isJoining: false,
      errorJoining: true,
    };
  },
  [getLoungeRoom.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      activeRoom: {
        ...state.activeRoom,
        hostId: payload?.hostId,
        name: payload?.name,
        auth: payload?.auth,
        code: payload?.code,
      },
    };
  },
  [refreshSpotifyToken.fulfilled]: (state, action) => {
    const { payload } = action;
    const { tokenOwner } = payload;
    if (tokenOwner !== TokenOwner.lounge) {
      return state;
    }

    return {
      ...state,
      activeRoom: {
        ...state.activeRoom,
        auth: {
          ...state.activeRoom.auth,
          accessToken: payload?.access_token,
          expiresIn: payload?.expires_in,
          expirationMs: getExpirationMs(payload?.expires_in),
        },
      },
    };
  },
};
