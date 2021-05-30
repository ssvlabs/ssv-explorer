import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';

const ValidatorsList = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        Validators List
      </Grid>
    </Layout>
  );
};

export default observer(ValidatorsList);
