import React from 'react';
import { observer } from 'mobx-react';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Header from '~app/components/Overview/components/Hero/components/Header';
import Container from '~app/components/Overview/components/Hero/components/Container';
import SearchInput from '~app/components/Overview/components/Hero/components/SearchInput';
import SearchButton from '~app/components/Overview/components/Hero/components/SearchButton';

type HeroProps = {
  onSearchClicked: () => void,
};

const Hero = ({ onSearchClicked }: HeroProps) => {
  return (
    <Container>
      <Header>Discover the SSV Network</Header>
      <SearchInput
        data-testid="search"
        placeholder="Search for validators and operators..."
        endAdornment={(
          <InputAdornment position="end">
            <SearchButton
              onClick={onSearchClicked}
              edge="end"
            >
              <SearchIcon />
            </SearchButton>
          </InputAdornment>
        )}
      />
    </Container>
  );
};

export default observer(Hero);
