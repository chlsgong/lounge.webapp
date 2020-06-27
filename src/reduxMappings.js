import _ from 'lodash';
import { requestSpotifyToken } from './redux/auth/actions';

export const mapStateToProps = state => ({
  isLoggedIn: _.get(state, 'login.isLoggedIn'),
  auth: _.get(state, 'auth'),
});

export const mapDispatchToProps = dispatch => ({
  onRequestSpotifyToken: (code) => dispatch(requestSpotifyToken(code)),
});
