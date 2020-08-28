import { selectIsLoggedIn } from './redux/login/selectors';
import { selectAuth } from './redux/auth/selectors';
import { requestSpotifyUserProfile } from './redux/user/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  auth: selectAuth(state),
});

export const mapDispatchToProps = dispatch => ({
  getSpotifyUserProfile: () => dispatch(requestSpotifyUserProfile()),
});
