import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

import SpotifySearch from './SpotifySearch';

class LoungeRoom extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return <SpotifySearch />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoungeRoom);
