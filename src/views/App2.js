import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';
import { getSpotifyAuthorize } from '../api/spotify';

import Home from './Home';
import Join from './Join';

class App2 extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      isJoinViewActive: false,
    };
  }

  onLoginWithSpotify = () => {
    window.location.href = getSpotifyAuthorize();
  }

  onJoinLounge = () => {
    this.setState({ isJoinViewActive: true });
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <Home />
      );
    }
    else if (this.state.isJoinViewActive) {
      return (
        <Join />
      );
    }

    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='center'
        >
          <Heading
            variant='display'
            p={5}
          >
            Lounge
          </Heading>
          <Flex
            flexDirection='column'
            justifyContent='center'
            p={7}
          >
            <Button
              my={2}
              sx={{
                ':hover': {
                  ...preset.buttons.primary,
                }
              }}
              variant='secondary'
              onClick={this.onLoginWithSpotify}
            >
              Login with Spotify
            </Button>
            <Button
              my={2}
              sx={{
                ':hover': {
                  ...preset.buttons.primary,
                }
              }}
              variant='secondary'
              onClick={this.onJoinLounge}
            >
              Join a Lounge room
            </Button>
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App2);
