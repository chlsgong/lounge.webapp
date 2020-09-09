import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

import SpotifySearch from './SpotifySearch';

class Join extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      codeText: '',
    };
  }

  getStatus = () => {
    const { isJoining, errorJoining } = this.props;

    if (isJoining) return 'Joining...';
    else if (errorJoining) return 'Lounge not found';
    else return '';
  }

  onCodeTextChange = event => {
    const codeText = event.target.value;
    this.setState({ codeText });
  }

  onJoinLounge = () => {
    const { codeText } = this.state;
    this.props.joinLounge(codeText);
  }

  render() {
    if (this.props.activeLoungeId) {
      return <SpotifySearch />;
    }

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
            Join a Lounge room
          </Heading>
          <Input
            id='code'
            name='code'
            type='text'
            placeholder='Enter lounge code'
            width={0.25}
            bg='white'
            textAlign='center'
            onChange={this.onCodeTextChange}
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
            onClick={this.onJoinLounge}
          >
            Join
          </Button>
          <Text
            my={2}
          >
            {this.getStatus()}
          </Text>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);
