import { openLoungeRoom, closeLoungeRoom } from './actions';
import { requestLoungeUser } from '../user/actions';

// Lounge reducer

export const initialState = {
  rooms: [],
  activeRoom: {
    id: '',
    loungeId: '',
    code: '',
  },
};

export const extraReducer = {
  [requestLoungeUser.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      rooms: payload?.lounges,
      activeRoom: {
        loungeId: payload?.activeLoungeId,
      },
    };
  },
  [openLoungeRoom.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      activeRoom: {
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
};
