import _ from 'lodash';
import loginSlice from './redux/slices/login';

export const mapStateToProps = state => {
  return {
    isLoggedIn: _.get(state, 'isLoggedIn'),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onLoginSuccess: () => dispatch(loginSlice.actions.loginSuccess()),
  };
};
