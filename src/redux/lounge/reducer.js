import { requestLoungeUser } from '../user/actions';

// Lounge reducer

export const initialState = {
  rooms: [],
};

export const extraReducer = {
  [requestLoungeUser.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      rooms: payload?.lounges,
    };
  },
};
