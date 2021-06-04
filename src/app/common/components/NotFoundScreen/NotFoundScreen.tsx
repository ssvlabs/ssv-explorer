import React from 'react';
import Grid from '@material-ui/core/Grid';

const NotFoundScreen = ({ notFound, children }: { notFound: boolean, children: any }) => {
  if (notFound) {
    return (
      <Grid container alignContent="center" alignItems="center" style={{ minHeight: 300, width: '100%', textAlign: 'center' }}>
        <Grid item xs={12} md={12}>
          <h1>Not Found</h1>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      {children}
    </>
  );
};

export default NotFoundScreen;
