import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button, Text } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class Home extends PureComponent {
  onCreateLounge = () => {
    this.props.createLounge();
  }

  renderLoungeItem = ({ name, code }) => {
    return (
      <Flex
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='space-evenly'
        height={128}
        px={3}
        sx={{
          borderTop: 'solid',
          borderWidth: 1,
        }}
      >
        <Text
          fontSize={4}
          color='secondary'
        >
          {name}
        </Text>
        <Text
          fontSize={3}
          color='secondary'
        >
          {code}
        </Text>
      </Flex>
    );
  }

  renderLoungeList = lounges => {
    const testLounges = [
      {
        name: 'Lounge 1',
        code: '123ABC'
      },
      {
        name: 'Lounge 2',
        code: '123ABC'
      },
      {
        name: 'Lounge 3',
        code: '123ABC'
      },
      {
        name: 'Lounge 4',
        code: '123ABC'
      },
      {
        name: 'Lounge 5',
        code: '123ABC'
      },
      {
        name: 'Lounge 6',
        code: '123ABC'
      },
      {
        name: 'Lounge 7',
        code: '123ABC'
      },
      {
        name: 'Lounge 8',
        code: '123ABC'
      }
    ];

    const loungeItems = testLounges.map(item => {
      return this.renderLoungeItem(item);
    }); 

    return (
      <Flex
        flexDirection='column'
        bg='gray'
      >
        {loungeItems}
      </Flex>
    );
  }

  render() {
    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='stretch'
        >
          <Heading
            textAlign='center'
            variant='display'
            py={5}
          >
            My Lounges
          </Heading>
          <Flex
            alignItems='center'
            justifyContent='center'
            py={3}
          >
            <Button
              sx={{
                ':hover': {
                  ...preset.buttons.primary,
                }
              }}
              variant='secondary'
              onClick={this.onCreateLounge}
            >
              Create new lounge
            </Button>
          </Flex>
          {this.renderLoungeList()}
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
