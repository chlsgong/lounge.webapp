import React, { PureComponent } from 'react';
import _ from 'lodash';
import qs from 'qs';

import config from './config';
import { createSocketHandlers } from './socket';

import JoinView from './JoinView';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      albumImage: '',
      playing: false,
      position: 0,
      duration: 0,
      isSelecting: true,
      isCreatingLounge: false,
      isJoiningLounge: false,
    };

    this.playerCheckInterval = null;
  }

  componentDidMount() {
    const { code, state } = this.getURLParams();

    if (code && state === 'thisisthecorrectapp12345678') {
      this.setState({ isSelecting: false, isCreatingLounge: true });
      this.requestSpotifyTokenAPI(code);
    }
  }

  checkForPlayer({ access_token }) {  
    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);

      // create the player
      this.player = new window.Spotify.Player({
        name: "Main Spotify Player",
        getOAuthToken: callback => { callback(access_token); },
      });
      this.createEventHandlers();
  
      // finally, connect!
      this.player.connect();
    }
  }

  login(auth) {
    this.setState({ auth, loggedIn: true });

    // TODO: Store locally and redirect to log back in

    this.socket = createSocketHandlers();
    this.socket.on('add-to-queue', data => {
      console.log('track received', data);

      this.onAddToQueue(data.trackURI);
    });

    if (this.socket) {
      this.socket.emit('create-lounge', { token: auth.access_token });
    }

    this.playerCheckInterval = setInterval(() => this.checkForPlayer(auth), 1000);
  }

  getSpotifyAuthorizationAPI = () => {
    const authorizeAPI = 'https://accounts.spotify.com/authorize'
    const clientId = '?client_id=16efad44cfd54e3ea050d602af68eadd';
    const responseType = '&response_type=code';
    const redirectURI = `&redirect_uri=${config.spotify.REDIRECT_URI}`;
    const state = '&state=thisisthecorrectapp12345678';
    const scope = `&scope=${["streaming", "user-read-email", "user-read-private"].join('%20')}`;

    return authorizeAPI + clientId + responseType + redirectURI + state + scope;
  }

  requestSpotifyTokenAPI = (code) => {
    return fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.spotify.REDIRECT_URI,
        client_id: '16efad44cfd54e3ea050d602af68eadd',
        client_secret: '10f26b66944143449acf95adcc4074bb',
      }),
    })
    .then(response => response.json())
    .then(auth => {
      console.log('success', auth);

      this.login(auth);
    })
    .catch(error => {
      console.log('error', error);
    });
  }

  getURLParams = () => {
    // get the params of the url
    const params = window.location.search
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    console.log('url callback parameters', params);

    return params;
  }

  createEventHandlers() {
    // Error handlers
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
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
      console.log("Let the music play on!");
      
      const { device_id } = data;

      this.setState({ deviceId: device_id }, this.transferPlaybackHere);
    });
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      
      // get track info
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");

      // get track state
      const playing = !state.paused;

      // get album cover
      const albumImage = _.first(currentTrack?.album?.images)?.url;
      
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        albumImage,
        playing
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

  onAddToQueue(trackURI) {
    const { auth } = this.state;

    fetch(`https://api.spotify.com/v1/me/player/queue?uri=${trackURI}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
    });
  }

  onPrevClick() {
    this.player.previousTrack();
  }
  
  onPlayClick() {
    this.player.togglePlay();
  }
  
  onNextClick() {
    this.player.nextTrack();
  }

  onCreateLounge = () => {
    this.setState({
      isSelecting: false,
      isCreatingLounge: true
    });
  }

  onJoinLounge = () => {
    this.setState({
      isSelecting: false,
      isJoiningLounge: true
    });
  }

  renderSelectionView = () => {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Lounge</h2>
          <h3>You are the DJ</h3>
        </div>
        <div className="App">
          <p>
            <button onClick={this.onCreateLounge}>Create a lounge</button>
            <button onClick={this.onJoinLounge}>Join a lounge</button>
          </p>
        </div>
      </div>
    );
  }

  render() {
    const {
      loggedIn,
      artistName,
      trackName,
      albumName,
      albumImage,
      error,
      playing,
    } = this.state;
  
    if (this.state.isSelecting) {
      return this.renderSelectionView();
    }
    else if (this.state.isCreatingLounge) {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Now Playing</h2>
            <p>A Spotify Web Playback API Demo.</p>
          </div>
    
          {error && <p>Error: {error}</p>}
    
          {loggedIn ?
          (<div>
            <p>Artist: {artistName}</p>
            <p>Track: {trackName}</p>
            <p>Album: {albumName}</p>
            <img src={albumImage} alt={"Album cover not found"} />
            <p>
              <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
              <button onClick={() => this.onNextClick()}>Next</button>
            </p>
          </div>)
          :
          (<div>
            <p className="App-intro">
              Connect your Spotify account.
            </p>
            <a href={this.getSpotifyAuthorizationAPI()}>
              Login
            </a>
          </div>)
          }
        </div>
      );
    }
    else {
      return (
        <JoinView />
      );
    }
  }
}

export default App;
