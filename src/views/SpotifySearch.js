import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Image, Button, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import _ from 'lodash';

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class SpotifySearch extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      queryString: '',
    };
  }

  onQueryStringChange = event => {
    const queryString = event.target.value;
    this.setState({ queryString });
  }

  onSearchSpotify = () => {
    const { queryString } = this.state;
    if (queryString) {
      this.props.querySpotify(queryString);
    }
  }

  onAddToQueue = uri => {
    this.props.addToQueue(uri);
  }

  renderAddToQueueButton = uri => {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Button
          variant='secondary'
          onClick={() => this.onAddToQueue(uri)}
        >
          Add to Queue
        </Button>
      </Flex>
    );
  }

  renderSearchResultsItem = (searchResult, index) => {
    const album = searchResult?.album;
    const name = searchResult?.name;
    const uri = searchResult?.uri;
    const albumName = album?.name;
    const artists = album?.artists || [];
    let artistNames = '';
    artists.forEach(artist => {
      artistNames = artistNames.concat(artist.name, ' ');
    });
    artistNames.trim();
    const images = album?.images;
    const imageUrl = _.get(images, '[1].url');
    const imageWidth = _.get(images, '[1].width');
    const imageHeight = _.get(images, '[1].height');

    // _.first(currentTrack?.album?.images)?.url;

    return (
      <Flex
        key={index}
        flexDirection='row'
        alignItems='stretch'
        justifyContent='space-between'
        height={imageHeight}
        px={3}
        sx={{
          borderTop: 'solid',
          borderWidth: 1,
        }}
      >
        <Flex
          flexDirection='row'
          alignItems='stretch'
          justifyContent='center'
          ml={-16}
        >
          <Image
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
          />
          <Flex
            flexDirection='column'
            justifyContent='space-evenly'
            mx={2}
          >
            <Text
              fontSize={4}
              color='secondary'
            >
              {name}
            </Text>
            <Text
              fontSize={2}
              color='secondary'
            >
              {albumName}
            </Text>
            <Text
              fontSize={2}
              color='secondary'
            >
              {artistNames}
            </Text>
          </Flex>
        </Flex>
        {this.renderAddToQueueButton(uri)}
      </Flex>
    );
  }

  renderSearchResults = () => {
    const { searchResults } = this.props;
    const searchResultItems = searchResults.map((item, index) => {
      return this.renderSearchResultsItem(item, index);
    }); 

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {searchResultItems}
      </Flex>
    );
  }

  render() {
    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='center'
        >
          <Heading
            variant='display'
            textAlign='center'
            p={5}
          >
            {this.props.activeLoungeName}
          </Heading>
          <Input
            id='spotify'
            name='spotify'
            type='text'
            placeholder='Song, album, or artist'
            width={0.25}
            bg='white'
            textAlign='center'
            onChange={this.onQueryStringChange}
          />
          <Button
            my={2}
            width={0.25}
            sx={{
              ':hover': {
                ...preset.buttons.primary,
              }
            }}
            variant='secondary'
            onClick={this.onSearchSpotify}
          >
            Search
          </Button>
          {/* <Text
            my={2}
          >
            {this.getStatus()}
          </Text> */}
          <Flex
            flexDirection='column'
            alignItems='stretch'
            width={1}
            pt={5}
          >
            {this.renderSearchResults()}
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifySearch);
