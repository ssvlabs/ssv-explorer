import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {OutlinedInput} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Welcome/Welcome.styles';

const HeroContainer = styled.div`
  min-height: 245px;
  height: 245px;
  background-color: #F2F2F2;
  width: 100%;
  border: 0;
  text-align: center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const HeroHeader = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-top: 50px;
`;

const SearchButton = styled(IconButton)`
  ${({ theme }) => `
    height: 40px;
    width: 40px;
    border-radius: 0;
    float: right;
    margin-left: auto;
  `}
`;

const Welcome = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <HeroContainer>
          <HeroHeader>Discover the SSV Network</HeroHeader>
          <OutlinedInput
            style={{
              margin: 'auto',
              marginTop: 0,
              width: 500,
              height: 40,
              paddingLeft: 0
            }}
            data-testid="search"
            placeholder="Search for validators and operators..."
            endAdornment={(
              <InputAdornment position="end">
                <SearchButton
                  onClick={() => {console.log('TODO')}}
                  edge="end"
                >
                  <SearchIcon />
                </SearchButton>
              </InputAdornment>
            )}
          />
        </HeroContainer>
      </Grid>
    </Layout>
  );
};

export default observer(Welcome);
