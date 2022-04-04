import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
// import Banner from '~app/common/components/Banner';
import Hero from '~app/components/Overview/components/Hero';
import Stats from '~app/components/Overview/components/Stats';
import Paper from '~app/components/Overview/components/Paper';
import Column from '~app/components/Overview/components/Column';
import Header from '~app/components/Overview/components/Header';
import Container from '~app/components/Overview/components/Container';
import { OperatorsTable, ValidatorsTable } from '~app/components/Overview/components/Tables';

const Overview = () => {
  const classes = useStyles();
  const tableContainerStyle = {
    border: '1px solid #5B6C84',
  };

  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <Hero />
        <Stats />
        {/* <Banner style={{ marginBottom: 0, marginTop: 50 }} /> */}
        <Container container spacing={5}>
          <Column item xs={12} md={6}>
            <Paper style={tableContainerStyle}>
              <Header>Operators</Header>
              <OperatorsTable />
            </Paper>
          </Column>
          <Column item xs={12} md={6}>
            <Paper style={tableContainerStyle}>
              <Header>Validators</Header>
              <ValidatorsTable />
            </Paper>
          </Column>
        </Container>
      </Grid>
    </Layout>
  );
};

export default observer(Overview);
