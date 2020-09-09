import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button, Text } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

class Home extends PureComponent {
  isLoungeActive = loungeId => {
    const { activeLoungeId } = this.props;
    return loungeId === activeLoungeId;
  }

  onCreateLoungeButtonClick = () => {
    this.props.createLounge('charles 1');
  }

  onLoungeButtonClick = loungeId => {
    if (this.isLoungeActive(loungeId)) {
      this.props.closeLounge(loungeId);
    }
    else {
      this.props.openLounge(loungeId);
    } 
  }

  renderLoungeButton = loungeId => {
    const text = this.isLoungeActive(loungeId) ? 'Close' : 'Open';

    return (
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Button
          variant='secondary'
          onClick={() => this.onLoungeButtonClick(loungeId)}
        >
          {text}
        </Button>
      </Flex>
    );
  }

  // TODO: change _id to id on server side
  renderLoungeItem = ({ _id, name, code }, index) => {
    return (
      <Flex
        key={index}
        flexDirection='row'
        alignItems='stretch'
        justifyContent='space-between'
        height={128}
        px={3}
        sx={{
          borderTop: 'solid',
          borderWidth: 1,
        }}
      >
        <Flex
          flexDirection='column'
          justifyContent='space-evenly'
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
        {this.renderLoungeStatus(_id)}
        {this.renderLoungeButton(_id)}
      </Flex>
    );
  }

  renderLoungeList = () => {
    const { lounges } = this.props;
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

  renderLoungeStatus = loungeId => {
    if (!this.isLoungeActive(loungeId)) return null;

    return (
      <Text
        alignSelf='center'
        color='green'
      >
        Active
      </Text>
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
              onClick={this.onCreateLoungeButtonClick}
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
