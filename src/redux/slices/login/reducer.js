// Login reducer

export const initialState = {
  isLoggedIn: false,
};

export default {
  loginSuccess: state => ({
    ...state,
    isLoggedIn: true,
  }),
  loginFailure: state => ({
    ...state,
    isLoggedIn: false,
  }),
  logout: _ => initialState,
};
