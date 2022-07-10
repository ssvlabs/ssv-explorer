import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import config from '~app/common/config';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import { Button } from '~app/common/components/Button';
import Hero from '~app/components/Overview/components/Hero';
import Stats from '~app/components/Overview/components/Stats';
import Column from '~app/components/Overview/components/Column';
import Header from '~app/components/Overview/components/Header';
import Container from '~app/components/Overview/components/Container';
import HeaderWrapper from '~app/components/Overview/components/HeaderWrapper';
import { OperatorsTable, ValidatorsTable } from '~app/components/Overview/components/Tables';

const Overview = () => {
  const history = useHistory();
  const classes = useStyles();
  const [operatorsExist, setOperatorsExist] = useState(false);
  const [validatorsExist, setValidatorsExist] = useState(false);
  
  const goTo = (url: string) => {
    history.push(url);
  };

  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <Hero />
        <Stats />
        {/* <Banner style={{ marginBottom: 0, marginTop: 50 }} /> */}
        <Container container className={classes.TablesWrapper}>
          <Column item md={12} lg>
            <HeaderWrapper>
              <Header>Operators</Header>
              <Button submitAction={() => goTo(config.routes.OPERATORS.HOME)} width={140} height={36} text={'View More'} type={'secondary'} disable={!operatorsExist} />
            </HeaderWrapper>
            <OperatorsTable setOperatorsExist={setOperatorsExist} />
          </Column>
          <Column item xs>
            <HeaderWrapper>
              <Header>Validators</Header>
              <Button submitAction={() => goTo(config.routes.VALIDATORS.HOME)} width={140} height={36} text={'View More'} type={'secondary'} disable={!validatorsExist} />
            </HeaderWrapper>
            <ValidatorsTable setValidatorsExist={setValidatorsExist} />
          </Column>
        </Container>
      </Grid>
    </Layout>
  );
};

export default observer(Overview);
