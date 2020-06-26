import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import qs from 'qs';

import config from './config';
import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

import Home from './Home';

class App2 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      auth: null,
    };
  }

  componentDidMount() {
    const { code, state } = this.getURLParams();

    if (code && state === 'thisisthecorrectapp12345678') {
      this.requestSpotifyTokenAPI(code);
    }
  }

  login(auth) {
    this.setState({ auth });
    this.props.onLoginSuccess();
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

  onLoginWithSpotify = () => {
    window.location.href = this.getSpotifyAuthorizationAPI();
  }

  render() {
    const { auth } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <ThemeProvider theme={preset}>
          <Home auth={auth} />;
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
