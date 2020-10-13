import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Button, Image, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import { Play, Pause, ChapterNext, ChapterPrevious } from 'grommet-icons';
import preset from '@rebass/preset'
import _ from 'lodash';

import Artist from './Artist';
import Album from './Album';
import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

import SpotifySearch from './SpotifySearch';

class LoungeRoom extends PureComponent {
  constructor(props) {
    super(props);

    this.playerCheckInterval = null;

    this.state = {
      trackName: '',
      albumName: '',
      artistName: '',
      albumImage: {
        url: '',
        width: 0,
        height: 0,
      },
      playing: false,
      isArtistSelected: false,
      isAlbumSelected: false,
      selectedAlbum: null,
    };
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  componentWillUnmount() {
    if (this.state.playing) {
      this.player.togglePlay();
      // TODO: don't update state
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
        name: 'Lounge Player', // TODO: change player name to lounge room name
        getOAuthToken: callback => callback(accessToken),
      });
      this.createEventHandlers();
  
      // finally, connect!
      this.player.connect();
    }
  }

  createEventHandlers() {
    // Error handlers
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      // TODO: get new access token with refresh token
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => {
      console.log(state);

      this.onStateChanged(state);
    });
  
    // Ready
    this.player.on('ready', data => {
      console.log('Let the music play on!');
      console.log(data);

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
      
      this.setState({
        // position,
        // duration,
        trackName,
        albumName,
        artistName,
        albumImage,
        playing,
      });
    }
  }

  onPlay = () => {
    this.player.togglePlay();
  }

  onPrev = () => {
    this.player.previousTrack();
  }

  onNext = () => {
    this.player.nextTrack();
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

    return this.state.playing ? pause : play;
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

  renderSpotifyPlayer = () => {
    const { albumImage } = this.state;

    return (
      <Flex
        flexDirection='column'
        alignItems='center'
        mt={4}
      >
        <Image
          src={albumImage?.url}
          width={albumImage?.width}
          height={albumImage?.height}
        />
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
