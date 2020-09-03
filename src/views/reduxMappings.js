import { selectIsLoggedIn } from '../redux/login/selectors';
import { selectLoungeRooms } from '../redux/lounge/selectors';
import { createLoungeRoom } from '../redux/lounge/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  lounges: selectLoungeRooms(state),
});

export const mapDispatchToProps = dispatch => ({
  createLounge: (name) => dispatch(createLoungeRoom(name)),
});
