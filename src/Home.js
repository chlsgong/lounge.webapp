import React, { PureComponent } from 'react';
import { Flex, Heading } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

class Home extends PureComponent {
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
