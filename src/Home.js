import React, { PureComponent } from 'react';
import { Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import _ from 'lodash';

import config from './config';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spotifyProfile: null,
    };
  }

  componentDidMount() {
    this.getSpotifyProfile(this.props.auth);
  }

  getSpotifyProfile = (auth) => {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(spotifyProfile => {
        console.log('success', spotifyProfile);

        this.setState({ spotifyProfile });

        const spotifyId = _.get(spotifyProfile, 'id');
        if (spotifyId) this.getUser(spotifyId);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  getUser = (spotifyId) => {
    const query = `?spotify_id=${encodeURI(spotifyId)}`;

    fetch(config.server.URL + '/user' + query, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log('success', data);
      })
      .catch(error => {
        console.log('error', error);

        // if not found create user
      });
  }

  createUser = (spotifyId) => {
    fetch(config.server.URL + '/user', {
      method: "POST",
      body: JSON.stringify({
        'spotify_id': spotifyId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('success', data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  render() {
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
            Home
          </Heading>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default Home;
