import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Image, Button, Text } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import _ from 'lodash';

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class Album extends PureComponent {
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

  renderTracksItem = (item, index) => {
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

  renderTracks = () => {
    const { selectedAlbumTracks } = this.props;
    const trackItems = selectedAlbumTracks.map((item, index) => {
      return this.renderTracksItem(item, index);
    });

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {trackItems}
      </Flex>
    );
  }

  renderBackButton = () => {
    return (
      <Flex
        justifyContent='center'
        alignSelf='stretch'
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
    const { album } = this.props;
    const { name, images } = album;
    const image = _.first(images);

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
            {this.renderTracks()}
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
