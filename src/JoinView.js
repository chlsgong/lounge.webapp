import React, { PureComponent } from 'react';

import { createSocketHandlers } from './socket';

import './JoinView.css';

class JoinView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      queryString: '',
      tracks: [],
      selectedTrackName: '',
      loungeId: '',
      hasJoinedRoom: false,
    };
  }


  onAddToQueue = (trackURI, trackName) => {
    this.setState({ selectedTrackName: trackName });

    this.socket.emit('add-to-queue', { id: this.state.loungeId, trackURI });
  }

  onSearch = () => {
    const { queryString, token } = this.state;
    const searchAPI = 'https://api.spotify.com/v1/search';
    const query = `?q=${encodeURI(queryString)}&type=track`;

    fetch(searchAPI + query, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('success', data);

      this.setState({ tracks: data?.tracks?.items });
    })
    .catch(error => {
      console.log('error', error);
    });
  }

  onJoinRoom = () => {
    this.setState({ hasJoinedRoom: true });

    this.socket = createSocketHandlers();
    this.socket.on('pass-token', ({ token }) => {
      console.log('token received', token);

      this.setState({ token });
    });
    this.socket.emit('join-lounge', { id: this.state.loungeId });
  }

  renderSearchResultsView = () => {
    const { tracks } = this.state;
    
    return (
      <ol>
        {tracks?.map((item, index) => {
          const name = item?.name;
          const artists = item?.artists;
          const uri = item?.uri;

          let artistNames = ' - ';
          artists.forEach(artist => {
            artistNames = artistNames.concat(artist.name, ' ');
          });

          const itemText = name.concat(' ', artistNames).trim();

          return <li key={index}><a href="# " onClick={() => this.onAddToQueue(uri, name)}>{itemText}</a></li>;
        })}
      </ol>
    )
  }

  renderRoomSelectionView = () => {
    const { loungeId } = this.state;

    return (
      <div className="JoinView">
        <div className="JoinView-header">
          <h2>Select a music lounge</h2>
        </div>
        <div>
          <p>
            <input type="text" value={loungeId} onChange={e => this.setState({ loungeId: e.target.value })} />
          </p>
          <p>
            <button disabled={!loungeId} onClick={this.onJoinRoom}>Join</button>
          </p>
        </div>
      </div>
    );
  }

  render() {
    const { queryString, selectedTrackName } = this.state;

    if (!this.state.hasJoinedRoom) {
      return this.renderRoomSelectionView();
    }

    return (
      <div className="JoinView">
          <div className="JoinView-header">
            <h2>Search for a song</h2>
          </div>
          <div>
            <p>
              <input type="text" value={queryString} onChange={e => this.setState({ queryString: e.target.value })} />
            </p>
            <p>
              <button disabled={!queryString} onClick={this.onSearch}>Search</button>
            </p>
            {selectedTrackName ? <p>Song added: {selectedTrackName}</p> : null}
            {this.renderSearchResultsView()}
          </div>
        </div>
    );
  }
}

export default JoinView;
