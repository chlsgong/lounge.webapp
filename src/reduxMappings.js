import _ from 'lodash';

export const mapStateToProps = state => ({
  isLoggedIn: _.get(state, 'login.isLoggedIn'),
  auth: _.get(state, 'auth'),
});
