import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '~app/components/Styles';

type ContentContainerProps = {
  children: React.ReactNode,
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  const classes = useStyles({});
  return (
    <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
      {children}
    </Grid>
  );
};

export default ContentContainer;
