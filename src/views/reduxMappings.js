import { selectIsLoggedIn } from '../redux/login/selectors';
import { selectLoungeRooms, selectActiveLoungeRoom, selectIsJoiningLounge, selectErrorJoining, selectActiveLoungeRoomId, selectActiveLoungeRoomName } from '../redux/lounge/selectors';
import { selectSpotifySearchResults } from '../redux/spotify/selectors';
import { createLoungeRoom, openLoungeRoom, closeLoungeRoom, joinLoungeRoom, getLoungeRoom } from '../redux/lounge/actions';
import { querySpotifyCatalog, addToSpotifyQueue } from '../redux/spotify/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  lounges: selectLoungeRooms(state),
  activeLounge: selectActiveLoungeRoom(state),
  activeLoungeId: selectActiveLoungeRoomId(state),
  activeLoungeName: selectActiveLoungeRoomName(state),
  isJoining: selectIsJoiningLounge(state),
  errorJoining: selectErrorJoining(state),
  searchResults: selectSpotifySearchResults(state),
});

export const mapDispatchToProps = dispatch => ({
  createLounge: name => dispatch(createLoungeRoom(name)),
  openLounge: loungeId => dispatch(openLoungeRoom(loungeId)),
  closeLounge: loungeId => dispatch(closeLoungeRoom(loungeId)),
  getLounge: loungeId => dispatch(getLoungeRoom(loungeId)),
  joinLounge: code => dispatch(joinLoungeRoom(code)),
  querySpotify: queryString => dispatch(querySpotifyCatalog(queryString)),
  addToQueue: uri => dispatch(addToSpotifyQueue(uri)),
});
