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

  onGoToArtist = id => {
    this.props.getSpotifyArtist(id);
    this.props.getSpotifyArtistAlbums(id);
    this.props.getSpotifyArtistTopTracks(id);

    this.props.onArtistSelected();
  }

  onOpenAlbum = album => {
    this.props.getSpotifyAlbumTracks(album?.id);

    this.props.onAlbumSelected(album);
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

  renderArtistDetailsButton = id => {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Button
          variant='secondary'
          onClick={() => this.onGoToArtist(id)}
        >
          Go to Page
        </Button>
      </Flex>
    );
  }

  renderAlbumDetailsButton = id => {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Button
          variant='secondary'
          onClick={() => this.onOpenAlbum(id)}
        >
          Open Album
        </Button>
      </Flex>
    );
  }

  renderTrackSearchResultsItem = (item, index) => {
    const album = item?.album;
    const name = item?.name;
    const uri = item?.uri;
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

  renderTrackSearchResults = () => {
    const { trackSearchResults } = this.props;
    const searchResultItems = trackSearchResults.map((item, index) => {
      return this.renderTrackSearchResultsItem(item, index);
    });
    const isResultsEmpty = _.isEmpty(trackSearchResults);

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {this.renderListHeader('Songs', isResultsEmpty)}
        {searchResultItems}
      </Flex>
    );
  }

  renderArtistSearchResultsItem = (item, index) => {
    const name = item?.name;
    const id = item?.id;
    const images = item?.images;
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
          </Flex>
        </Flex>
        {this.renderArtistDetailsButton(id)}
      </Flex>
    );
  }

  renderArtistSearchResults = () => {
    const { artistSearchResults } = this.props;
    const searchResultItems = artistSearchResults.map((item, index) => {
      return this.renderArtistSearchResultsItem(item, index);
    });
    const isResultsEmpty = _.isEmpty(artistSearchResults);

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {this.renderListHeader('Artists', isResultsEmpty)}
        {searchResultItems}
      </Flex>
    );
  }

  renderAlbumSearchResultsItem = (item, index) => {
    const name = item?.name;
    const artists = item?.artists || [];
    let artistNames = '';
    artists.forEach(artist => {
      artistNames = artistNames.concat(artist.name, ' ');
    });
    artistNames.trim();
    const images = item?.images;
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
              {artistNames}
            </Text>
          </Flex>
        </Flex>
        {this.renderAlbumDetailsButton(item)}
      </Flex>
    );
  }

  renderAlbumSearchResults = () => {
    const { albumSearchResults } = this.props;
    const searchResultItems = albumSearchResults.map((item, index) => {
      return this.renderAlbumSearchResultsItem(item, index);
    });
    const isResultsEmpty = _.isEmpty(albumSearchResults);

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {this.renderListHeader('Albums', isResultsEmpty)}
        {searchResultItems}
      </Flex>
    );
  }

  renderListHeader = (title, hidden) => {
    if (hidden) return null;

    return (
      <Heading variant='listHeader'>
        {title}
      </Heading>
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
            {this.renderTrackSearchResults()}
            {this.renderArtistSearchResults()}
            {this.renderAlbumSearchResults()}
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifySearch);
