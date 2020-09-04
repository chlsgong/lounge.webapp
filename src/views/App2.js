import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';
import { getSpotifyAuthorize } from '../api/spotify';

import Home from './Home';

class App2 extends PureComponent {
  onLoginWithSpotify = () => {
    window.location.href = getSpotifyAuthorize();
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <ThemeProvider theme={preset}>
          <Home />
        </ThemeProvider>
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
              onClick={() => null}
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
