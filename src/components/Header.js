import React from 'react';
import { Flex } from 'rebass';
import { ThemeProvider } from 'emotion-theming'
import defautTheme from '../themes/default';

const Header = (props) => {
  return (
    <ThemeProvider theme={defautTheme}>
      <Flex
        height={48}
        alignSelf='stretch'
        mb={3}
        bg='dark'
      >
        <Flex
          width={1}
          alignItems='center'
        >
          {props.left}
        </Flex>
        <Flex
          width={1}
          alignItems='center'
          justifyContent='center'
        >
          {props.center}
        </Flex>
        <Flex
          width={1}
          alignItems='center'
          justifyContent='flex-end'
        >
          {props.right}
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}

export default Header;
