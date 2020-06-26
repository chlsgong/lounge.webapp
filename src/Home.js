import React, { PureComponent } from 'react';
import { Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import _ from 'lodash';
import axios from 'axios';

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
    axios.get(config.server.URL + '/user', {
      params: {
        spotify_id: spotifyId
      }
    })
      .then(response => {
        console.log('success', response.data)
      })
      .catch(error => {
        console.log('error', error.response);

        if (error.response.status === 404) {
          this.createUser(spotifyId);
        }
      });
  }

  createUser = (spotifyId) => {
    axios.post(config.server.URL + '/user', {
        spotify_id: spotifyId,
      })
      .then(response => {
        console.log('success', response.data)
      })
      .catch(error => {
        console.log('error', error.response);
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
