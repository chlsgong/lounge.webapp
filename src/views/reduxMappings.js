import { selectIsLoggedIn } from '../redux/login/selectors';
import { selectLoungeRooms, selectActiveLoungeRoom, selectIsJoiningLounge, selectErrorJoining, selectActiveLoungeRoomId, selectActiveLoungeRoomName } from '../redux/lounge/selectors';
import { createLoungeRoom, openLoungeRoom, closeLoungeRoom, joinLoungeRoom } from '../redux/lounge/actions';
import { querySpotifyCatalog } from '../redux/spotify/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  lounges: selectLoungeRooms(state),
  activeLounge: selectActiveLoungeRoom(state),
  activeLoungeId: selectActiveLoungeRoomId(state),
  activeLoungeName: selectActiveLoungeRoomName(state),
  isJoining: selectIsJoiningLounge(state),
  errorJoining: selectErrorJoining(state),
});

export const mapDispatchToProps = dispatch => ({
  createLounge: name => dispatch(createLoungeRoom(name)),
  openLounge: loungeId => dispatch(openLoungeRoom(loungeId)),
  closeLounge: loungeId => dispatch(closeLoungeRoom(loungeId)),
  joinLounge: code => dispatch(joinLoungeRoom(code)),
  querySpotify: queryString => dispatch(querySpotifyCatalog(queryString)),
});
