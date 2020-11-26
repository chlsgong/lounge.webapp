import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, Button, Image, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import { Play, Pause, ChapterNext, ChapterPrevious } from 'grommet-icons';
import preset from '@rebass/preset'
import _ from 'lodash';

import Artist from './Artist';
import Album from './Album';
import SpotifySearch from './SpotifySearch';
import { mapStateToProps, mapDispatchToProps } from './reduxMappings';
import { TokenOwner } from '../constants';

class LoungeRoom extends PureComponent {
  constructor(props) {
    super(props);

    this.playerCheckInterval = null;

    this.state = {
      isArtistSelected: false,
      isAlbumSelected: false,
      selectedAlbum: null,
    };
  }

  componentDidMount() {
    if (this.props.isBrowser) {
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  componentWillUnmount() {
    if (this.player && this.props.isBrowser && this.props.player.playing) {
      this.player.togglePlay();
    }
  }

  onArtistSelected = () => {
    this.setState({ isArtistSelected: true });
  }

  onAlbumSelected = selectedAlbum => {
    this.setState({ isAlbumSelected: true, selectedAlbum });
  }

  onBackToLounge = () => {
    this.setState({ isArtistSelected: false, isAlbumSelected: false, selectedAlbum: null });
  }

  checkForPlayer() {
    if (window.Spotify !== null && !this.player) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);

      // get access token
      const { accessToken } = this.props;

      // create the player
      this.player = new window.Spotify.Player({
        name: this.props.activeLoungeName || 'Lounge Player',
        getOAuthToken: callback => callback(accessToken),
      });

      if (this.player) {
        this.createEventHandlers();
    
        // finally, connect!
        this.player.connect();
      }
    }
  }

  createEventHandlers() {
    // Error handlers
    this.player.on('initialization_error', e => {});
    this.player.on('authentication_error', e => {
      this.props.refreshToken(TokenOwner.user);
    });
    this.player.on('account_error', e => {});
    this.player.on('playback_error', e => {});
  
    // Playback status updates
    this.player.on('player_state_changed', state => {
      this.onStateChanged(state);
    });
  
    // Ready
    this.player.on('ready', data => {
      const { device_id } = data;
      this.props.transferPlayback({
        deviceId: device_id,
        autoPlay: false
      });
    });
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        // position,
        // duration,
      } = state.track_window;
      
      // get track info
      const trackName = currentTrack?.name;
      const albumName = currentTrack?.album?.name;
      const artistName = currentTrack?.artists?.map(artist => artist?.name).join(', ');
      const albumImage = _.first(currentTrack?.album?.images);

      // get track state
      const playing = !state.paused;

      // create player state
      const playerState = {
        trackName,
        albumName,
        artistName,
        albumImage,
        playing,
      };
      
      // set player state
      this.props.updatePlayerState(playerState);
    }
  }

  onPlay = () => {
    if (this.props.isBrowser && this.player) {
      this.player.togglePlay();
    }
    else if (this.props.player.playing) {
      this.props.pauseTrack();
    }
    else {
      this.props.playTrack();
    }
  }

  onPrev = () => {
    if (this.props.isBrowser && this.player) {
      this.player.previousTrack();
    }
    else {
      this.props.previousTrack();
    }
  }

  onNext = () => {
    if (this.props.isBrowser && this.player) {
      this.player.nextTrack();
    }
    else {
      this.props.nextTrack();
    }
  }

  onOpenSpotify = () => {
    this.props.getRecentlyPlayedTrack();
  }

  getPlayIcon = () => {
    const play = (
      <Play
        color='white'
        size='24px'
      />
    );
    const pause = (
      <Pause
        color='white'
        size='24px'
      />
    );

    return this.props.player.playing ? pause : play;
  }

  renderCloseRoomButton = () => {
    return (
      <Flex
        justifyContent='center'
        mt={3}
      >
        <Button
          variant='secondary'
          onClick={this.props.onCloseLounge}
          width={0.25}
        >
          Close Lounge
        </Button>
      </Flex>
    );
  }

  renderOpenSpotifyButton = () => {
    if (this.props.isBrowser || !this.props.player.isCurrentTrackEmpty) return null;

    return (
      <Flex
        justifyContent='center'
        mt={3}
      >
        <Button
          variant='secondary'
          onClick={this.onOpenSpotify}
          width={0.25}
        >
          Open Spotify
        </Button>
      </Flex>
    );
  }

  renderPlayerButton = (icon, onClick) => {
    return (
      <Button
        mx={2}
        bg='primary'
        onClick={onClick}
      >
        {icon}
      </Button>
    );
  }

  renderAlbumImage = () => {
    const { albumImage, isCurrentTrackEmpty } = this.props.player;

    if (isCurrentTrackEmpty) {
      return (
        <Heading
          variant='heading'
          textAlign='center'
          fontSize={4}
        >
          No currently playing track, tap button to open Spotify
        </Heading>
      );
    }
    else {
      return (
        <Image
          src={albumImage?.url}
          width={albumImage?.width}
          height={albumImage?.height}
        />
      );
    }
  }

  renderSpotifyPlayer = () => {
    const { trackName, artistName } = this.props.player;

    return (
      <Flex
        flexDirection='column'
        alignItems='center'
        mt={4}
      >
        {this.renderAlbumImage()}
        <Heading
          variant='heading'
          textAlign='center'
          fontSize={5}
          p={3}
        >
          {trackName}
        </Heading>
        <Heading
          variant='heading'
          textAlign='center'
          fontSize={4}
        >
          {artistName}
        </Heading>
        <Flex
          flexDirection='row'
          mt={2}
        >
          {this.renderPlayerButton(
            <ChapterPrevious
              color='white'
              size='24px'
            />,
            this.onPrev
          )}
           {this.renderPlayerButton(
            this.getPlayIcon(),
            this.onPlay
          )}
          {this.renderPlayerButton(
            <ChapterNext
              color='white'
              size='24px'
            />,
            this.onNext
          )}
        </Flex>
      </Flex>
    );
  }

  renderLoungeCodeLabel = () => {
    const { code } = this.props.activeLounge;

    return (
      <Heading
        variant='display'
        textAlign='center'
        p={5}
      >
        {code}
      </Heading>
    )
  }

  render() {
    if (this.state.isArtistSelected) {
      return <Artist onBack={this.onBackToLounge} />;
    }

    if (this.state.isAlbumSelected) {
      return <Album album={this.state.selectedAlbum} onBack={this.onBackToLounge} />;
    }

    return (
      <ThemeProvider theme={preset}>
        <Flex flexDirection='column'>
          {this.renderCloseRoomButton()}
          {this.renderLoungeCodeLabel()}
          {this.renderOpenSpotifyButton()}
          {this.renderSpotifyPlayer()}
          <SpotifySearch
            onArtistSelected={this.onArtistSelected}
            onAlbumSelected={this.onAlbumSelected}
          />
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoungeRoom);
