import { selectIsLoggedIn } from '../redux/login/selectors';
import { selectAuth } from '../redux/auth/selectors';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  auth: selectAuth(state),
});

export const mapDispatchToProps = dispatch => ({});
