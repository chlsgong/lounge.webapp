import { selectAccessToken } from '../redux/auth/selectors';
import { selectIsLoggedIn } from '../redux/login/selectors';
import {
  selectLoungeRooms,
  selectActiveLoungeRoom,
  selectIsJoiningLounge,
  selectErrorJoining,
  selectActiveLoungeRoomDbId,
  selectActiveLoungeRoomId,
  selectActiveLoungeRoomName,
} from '../redux/lounge/selectors';
import {
  selectTrackSearchResults,
  selectAlbumSearchResults,
  selectArtistSearchResults,
  selectSelectedArtist,
  selectSelectedArtistAlbums,
  selectSelectedArtistTopTracks,
  selectSelectedAlbumTracks,
} from '../redux/spotify/selectors';
import { selectPlayer } from '../redux/player/selectors';
import { selectIsBrowser } from '../redux/app/selectors';
import { refreshSpotifyToken } from '../redux/auth/actions';
import { generateSpotifyState } from '../redux/auth/extraActions';
import { logout } from '../redux/login/actions';
import { createLoungeRoom, openLoungeRoom, closeLoungeRoom, joinLoungeRoom, getLoungeRoom } from '../redux/lounge/actions';
import {
  querySpotifyCatalog,
  addToSpotifyQueue,
  transferSpotifyPlayback,
  retrieveSpotifyArtist,
  retrieveSpotifyArtistAlbums,
  retrieveSpotifyArtistTopTracks,
  retrieveSpotifyAlbumTracks,
  play,
  pause,
  playPrevious,
  playNext,
} from '../redux/spotify/actions';
import { updatePlayer } from '../redux/player/extraActions';

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  lounges: selectLoungeRooms(state),
  activeLounge: selectActiveLoungeRoom(state),
  activeLoungeDbId: selectActiveLoungeRoomDbId(state),
  activeLoungeId: selectActiveLoungeRoomId(state),
  activeLoungeName: selectActiveLoungeRoomName(state),
  isJoining: selectIsJoiningLounge(state),
  errorJoining: selectErrorJoining(state),
  trackSearchResults: selectTrackSearchResults(state),
  albumSearchResults: selectAlbumSearchResults(state),
  artistSearchResults: selectArtistSearchResults(state),
  selectedArtist: selectSelectedArtist(state),
  selectedArtistAlbums: selectSelectedArtistAlbums(state),
  selectedArtistTopTracks: selectSelectedArtistTopTracks(state),
  selectedAlbumTracks: selectSelectedAlbumTracks(state),
  accessToken: selectAccessToken(state),
  player: selectPlayer(state),
  isBrowser: selectIsBrowser(state),
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
  getSpotifyArtistAlbums: artistId => dispatch(retrieveSpotifyArtistAlbums(artistId)),
  getSpotifyArtistTopTracks: artistId => dispatch(retrieveSpotifyArtistTopTracks(artistId)),
  getSpotifyAlbumTracks: albumId => dispatch(retrieveSpotifyAlbumTracks(albumId)),
  logout: _ => dispatch(logout()),
  refreshToken: tokenOwner => dispatch(refreshSpotifyToken(tokenOwner)),
  generateSpotifyCode: () => generateSpotifyState(dispatch),
  playTrack: () => dispatch(play()),
  pauseTrack: () => dispatch(pause()),
  previousTrack: () => dispatch(playPrevious()),
  nextTrack: () => dispatch(playNext()),
  updatePlayerState: playerState => dispatch(updatePlayer(playerState)),
});
