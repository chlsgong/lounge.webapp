import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

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
    if (this.state.queryString) {
      this.props.querySpotify(this.state.queryString);
    }
  }

  renderSearchResultsItem = ({ spotifyId }, index) => {
    // return (
    //   <Flex
    //     key={index}
    //     flexDirection='row'
    //     alignItems='stretch'
    //     justifyContent='space-between'
    //     height={128}
    //     px={3}
    //     sx={{
    //       borderTop: 'solid',
    //       borderWidth: 1,
    //     }}
    //   >
    //     <Flex
    //       flexDirection='column'
    //       justifyContent='space-evenly'
    //     >
    //       <Text
    //         fontSize={4}
    //         color='secondary'
    //       >
    //         {name}
    //       </Text>
    //       <Text
    //         fontSize={3}
    //         color='secondary'
    //       >
    //         {code}
    //       </Text>
    //     </Flex>
    //     {this.renderLoungeButton(_id)}
    //   </Flex>
    // );
  }

  renderSearchResults = () => {
    // const { lounges } = this.props;
    // const loungeItems = lounges.map((item, index) => {
    //   return this.renderLoungeItem(item, index);
    // }); 

    // return (
    //   <Flex
    //     flexDirection='column'
    //     bg='gray'
    //   >
    //     {loungeItems}
    //   </Flex>
    // );
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
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifySearch);
