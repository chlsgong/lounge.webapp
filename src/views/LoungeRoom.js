import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Button } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

import SpotifySearch from './SpotifySearch';

class LoungeRoom extends PureComponent {
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

  render() {
    return (
      <ThemeProvider theme={preset}>
        <Flex flexDirection='column'>
          {this.renderCloseRoomButton()}
          <SpotifySearch />
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoungeRoom);
