import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class Join extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='stretch'
        >
          <Heading
            variant='display'
            p={5}
          >
            Join a Lounge room
          </Heading>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='jane@example.com'
          />
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            <Button
              my={2}
              sx={{
                ':hover': {
                  ...preset.buttons.primary,
                }
              }}
              variant='secondary'
              onClick={() => null}
            >
              Join
            </Button>
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);
