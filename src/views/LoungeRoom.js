import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Button, Image } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import _ from 'lodash';

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
    };
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  checkForPlayer() {
    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);

      // get access token
      const { accessToken } = this.props;

      // create the player
      this.player = new window.Spotify.Player({
        name: 'Lounge Player',
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

  transferPlaybackHere() {
    const { deviceId, auth } = this.state;

    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": false, // TODO: change this back to 'true'
      }),
    });
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
      </Flex>
    );
  }

  render() {
    return (
      <ThemeProvider theme={preset}>
        <Flex flexDirection='column'>
          {this.renderCloseRoomButton()}
          {this.renderSpotifyPlayer()}
          <SpotifySearch />
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoungeRoom);
