import React, { PureComponent } from 'react';

import { createSocketHandlers } from './socket';

import './JoinView.css';

class JoinView extends PureComponent {
  componentDidMount() {
    this.socket = createSocketHandlers();
  }

  onAddToQueue() {
    const trackURI = "spotify:track:55jJiuvjDJ3opwgVI6SlVa";

    this.socket.emit('add-to-queue', { trackURI });
  }

  render() {
    return (
      <div className="JoinView">
          <div className="JoinView-header">
            <h2>Search for a song.</h2>
          </div>
          <div>
            <p>
              <button onClick={() => this.onAddToQueue()}>Add to queue</button>
            </p>
          </div>
        </div>
    );
  }
}

export default JoinView;
