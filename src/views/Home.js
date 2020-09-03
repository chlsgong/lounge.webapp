import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button, Text } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class Home extends PureComponent {
  onCreateLounge = () => {
    this.props.createLounge('charles 1');
  }

  renderLoungeItem = ({ name, code }, index) => {
    return (
      <Flex
        key={index}
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
    const loungeItems = lounges.map((item, index) => {
      return this.renderLoungeItem(item, index);
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
    const { lounges } = this.props;

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
          {this.renderLoungeList(lounges)}
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
