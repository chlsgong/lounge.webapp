import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
    };

    this.playerCheckInterval = null;
  }

  checkForPlayer() {
    const { token } = this.state;
  
    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);

      // create the player
      this.player = new window.Spotify.Player({
        name: "Main Spotify Player",
        getOAuthToken: callback => { callback(token); },
      });
      this.createEventHandlers();
  
      // finally, connect!
      this.player.connect();
    }
  }

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });

      // check every second for the player.
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
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
      
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;

    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": true,
      }),
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

  render() {
    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
    } = this.state;
  
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
          <p>
            <button onClick={() => this.onPrevClick()}>Previous</button>
            <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
            <button onClick={() => this.onNextClick()}>Next</button>
          </p>
        </div>)
        :
        (<div>
          <p className="App-intro">
            Enter your Spotify access token. Get it from{" "}
            <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
              here
            </a>.
          </p>
          <p>
            <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
          </p>
          <p>
            <button onClick={() => this.handleLogin()}>Go</button>
          </p>
        </div>)
        }
      </div>
    );
  }
}

export default App;
