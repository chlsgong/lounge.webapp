import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Image, Button, Text } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import _ from 'lodash';

import Album from './Album';
import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class Artist extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlbum: null,
    };
  }

  onAddToQueue = uri => {
    this.props.addToQueue(uri);
  }

  onOpenAlbum = selectedAlbum => {
    this.props.getSpotifyAlbumTracks(selectedAlbum?.id);
    
    this.setState({ selectedAlbum });
  }

  onBackToArtist = () => {
    this.setState({ selectedAlbum: null });
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

  renderAlbumDetailsButton = album => {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Button
          variant='secondary'
          onClick={() => this.onOpenAlbum(album)}
        >
          Open Album
        </Button>
      </Flex>
    );
  }

  renderTopTracksItem = (item, index) => {
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

  renderTopTracks = () => {
    const { selectedArtistTopTracks } = this.props;
    const trackItems = selectedArtistTopTracks.map((item, index) => {
      return this.renderTopTracksItem(item, index);
    });
    const isResultsEmpty = _.isEmpty(selectedArtistTopTracks);

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {this.renderListHeader('Top songs', isResultsEmpty)}
        {trackItems}
      </Flex>
    );
  }

  renderAlbumsItem = (item, index) => {
    const name = item?.name;
    // const id = item?.id;
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

  renderAlbums = () => {
    const { selectedArtistAlbums } = this.props;
    const albumItems = selectedArtistAlbums.map((item, index) => {
      return this.renderAlbumsItem(item, index);
    });
    const isResultsEmpty = _.isEmpty(selectedArtistAlbums);

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {this.renderListHeader('Albums', isResultsEmpty)}
        {albumItems}
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

  renderBackButton = () => {
    return (
      <Flex
        justifyContent='center'
        mt={3}
      >
        <Button
          variant='secondary'
          onClick={this.props.onBack}
          width={0.25}
        >
          Back
        </Button>
      </Flex>
    );
  }

  render() {
    const { selectedArtist } = this.props;
    const { selectedAlbum } = this.state;
    const { name, images } = selectedArtist;
    const image = _.first(images);

    if (selectedAlbum) {
      return <Album album={selectedAlbum} onBack={this.onBackToArtist} />;
    }

    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='center'
        >
          {this.renderBackButton()}
          <Heading
            variant='display'
            textAlign='center'
            p={5}
          >
            {name}
          </Heading>
          <Image
            src={image?.url}
            width={image?.width}
            height={image?.height}
          />
          <Flex
            flexDirection='column'
            alignItems='stretch'
            width={1}
            pt={5}
          >
            {this.renderTopTracks()}
            {this.renderAlbums()}
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
