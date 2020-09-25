import { selectAccessToken } from '../redux/auth/selectors';
import { selectIsLoggedIn } from '../redux/login/selectors';
import {
  selectLoungeRooms,
  selectActiveLoungeRoom,
  selectIsJoiningLounge,
  selectErrorJoining,
  selectActiveLoungeRoomId,
  selectActiveLoungeRoomName
} from '../redux/lounge/selectors';
import { selectTrackSearchResults, selectAlbumSearchResults, selectArtistSearchResults } from '../redux/spotify/selectors';
import { logout } from '../redux/login/actions';
import { createLoungeRoom, openLoungeRoom, closeLoungeRoom, joinLoungeRoom, getLoungeRoom } from '../redux/lounge/actions';
import { querySpotifyCatalog, addToSpotifyQueue, transferSpotifyPlayback, retrieveSpotifyArtist } from '../redux/spotify/actions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  lounges: selectLoungeRooms(state),
  activeLounge: selectActiveLoungeRoom(state),
  activeLoungeId: selectActiveLoungeRoomId(state),
  activeLoungeName: selectActiveLoungeRoomName(state),
  isJoining: selectIsJoiningLounge(state),
  errorJoining: selectErrorJoining(state),
  trackSearchResults: selectTrackSearchResults(state),
  albumSearchResults: selectAlbumSearchResults(state),
  artistSearchResults: selectArtistSearchResults(state),
  accessToken: selectAccessToken(state),
});

export const mapDispatchToProps = dispatch => ({
  createLounge: name => dispatch(createLoungeRoom(name)),
  openLounge: loungeId => dispatch(openLoungeRoom(loungeId)),
  closeLounge: loungeId => dispatch(closeLoungeRoom(loungeId)),
  getLounge: loungeId => dispatch(getLoungeRoom(loungeId)),
  joinLounge: code => dispatch(joinLoungeRoom(code)),
  querySpotify: queryString => dispatch(querySpotifyCatalog({ queryString, limit: 6 })),
  addToQueue: uri => dispatch(addToSpotifyQueue(uri)),
  transferPlayback: params => dispatch(transferSpotifyPlayback(params)),
  getSpotifyArtist: artistId => dispatch(retrieveSpotifyArtist(artistId)),
  logout: _ => dispatch(logout()),
});
