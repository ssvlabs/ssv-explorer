import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '~app/components/Styles';

type ContentContainerProps = {
  children: React.ReactNode,
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
      <Paper className={classes.paperContainer}>
        {children}
      </Paper>
    </Grid>
  );
};

export default ContentContainer;
