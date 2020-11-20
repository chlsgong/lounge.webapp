import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Flex, Heading, Button, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { mapStateToProps, mapDispatchToProps } from './reduxMappings';

import LoungeRoom from './LoungeRoom';
import Join from './Join';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loungeName: '',
      hasJoinedLounge: false,
      isJoinViewActive: false,
    };
  }

  componentDidUpdate(prevProps) {
    // Joins an open room when app is reloaded and gets lounge user
    // Should not do this if opening a new room
    if (!prevProps.activeLoungeId && this.props.activeLoungeId && !this.props.activeLoungeDbId) {
      this.onJoinLounge(this.props.activeLoungeId);
    }
  }

  isLoungeActive = loungeId => {
    const { activeLoungeId } = this.props;
    return loungeId === activeLoungeId;
  }

  onCreateLoungeButtonClick = () => {
    const { loungeName } = this.state;
    if (loungeName) {
      this.props.createLounge(loungeName);
    }
  }

  onCloseLounge = () => {
    const { activeLoungeId } = this.props;
    this.props.closeLounge(activeLoungeId);
    this.setState({ hasJoinedLounge: false });
  }

  onOpenLounge = loungeId => {
    this.props.openLounge(loungeId);
    this.setState({ hasJoinedLounge: true });
  }

  onJoinLounge = loungeId => {
    this.props.getLounge(loungeId);
    this.setState({ hasJoinedLounge: true });
  }

  onSearchLounge = () => {
    this.setState({ isJoinViewActive: true });
  }

  onLoungeClosed = () => {
    this.setState({ hasJoinedLounge: false });
  }

  onLoungeNameChange = event => {
    const loungeName = event.target.value;
    this.setState({ loungeName });
  }

  renderLoungeButton = loungeId => {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Button
          variant='secondary'
          onClick={() => this.onOpenLounge(loungeId)}
        >
          Open
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
    if (this.state.isJoinViewActive) {
      return (
        <Join />
      );
    } else if (this.state.hasJoinedLounge) {
      return (
        <LoungeRoom
          onCloseLounge={this.onCloseLounge}
        />
      );
    }

    return (
      <ThemeProvider theme={preset}>
        <Flex
          flexDirection='column'
          alignItems='center'
        >
          <Flex
            alignSelf='stretch'
            mb={3}
          >
            <Button onClick={this.onSearchLounge}>
              Join a Lounge room
            </Button>
            <Button onClick={this.props.logout}>
              Logout
            </Button>
          </Flex>
          <Heading
            textAlign='center'
            variant='display'
            py={5}
          >
            My Lounges
          </Heading>
          <Input
            id='loungeName'
            name='loungeName'
            type='text'
            placeholder='Lounge name'
            width={0.25}
            bg='white'
            textAlign='center'
            onChange={this.onLoungeNameChange}
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
            onClick={this.onCreateLoungeButtonClick}
          >
            Create new lounge
          </Button>
          <Flex
            flexDirection='column'
            alignItems='stretch'
            width={1}
            pt={5}
          >
            {this.renderLoungeList()}
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
