import { selectIsLoggedIn } from '../redux/login/selectors';
import { createLoungeRoom } from '../redux/lounge/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
});

export const mapDispatchToProps = dispatch => ({
  createLounge: (name) => dispatch(createLoungeRoom(name)),
});
