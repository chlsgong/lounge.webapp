// App reducer

export const initialState = {
  isBrowser: true,
};

export const reducer = {
  setBrowser: (state, action) => {
    return {
      ...state,
      isBrowser: action.payload,
    }
  },
};
