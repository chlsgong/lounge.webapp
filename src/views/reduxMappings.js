import { selectIsLoggedIn } from '../redux/login/selectors';
import { selectLoungeRooms, selectActiveLoungeRoom } from '../redux/lounge/selectors';
import { createLoungeRoom, openLoungeRoom, closeLoungeRoom } from '../redux/lounge/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  lounges: selectLoungeRooms(state),
  activeLounge: selectActiveLoungeRoom(state),
});

export const mapDispatchToProps = dispatch => ({
  createLounge: name => dispatch(createLoungeRoom(name)),
  openLounge: loungeId => dispatch(openLoungeRoom(loungeId)),
  closeLounge: loungeId => dispatch(closeLoungeRoom(loungeId)),
});
