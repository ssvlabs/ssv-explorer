import React from 'react';
import { observer } from 'mobx-react';
import SmartSearch from '~app/common/components/SmartSearch';
import Header from '~app/components/Overview/components/Hero/components/Header';
import Container from '~app/components/Overview/components/Hero/components/Container';

const Hero = () => {
  return (
    <Container>
      <Header>Discover the SSV Network</Header>
      <SmartSearch />
    </Container>
  );
};

export default observer(Hero);
