import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';
import { getSpotifyAuthorize } from './api/spotify';

import Home from './Home';

class App2 extends PureComponent {
  onLoginWithSpotify = () => {
    window.location.href = getSpotifyAuthorize();
  }

  render() {
    const { isLoggedIn, auth, getSpotifyUserProfile } = this.props;

    if (isLoggedIn) {
      return (
        <ThemeProvider theme={preset}>
          <Home
            auth={auth}
            getSpotifyUserProfile={getSpotifyUserProfile} // NOTE: temporary
          />;
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='center'
          bg='primary'
        >
          <Heading
            variant='display'
            p={5}
          >
            Lounge
          </Heading>
          <Flex
            justifyContent='center'
            bg='primary'
            p={8}
          >
            <Button
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
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App2);
