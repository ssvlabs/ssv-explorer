import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';

type NotFoundScreenProps = {
  notFound: boolean,
  children: any,
  query?: string,
};

const NotFoundScreen = ({ notFound, children, query }: NotFoundScreenProps) => {
  if (notFound) {
    const history = useHistory();
    const params: Record<string, any> = useParams();
    const queryParam = query ?? params.address;

    const onBackButtonClick = () => {
      if (history.length > 2) {
        return history.goBack();
      }
      window.location.href = '/';
    };

    return (
      <Grid container style={{ minHeight: 300, width: '100%' }}>
        <Grid item xs={12} md={12}>
          <Typography variant="h1">No search results were found</Typography>
          <Grid container>
            We could not find what you were looking {queryParam ? `for "${queryParam}"` : ''}
          </Grid>
          <Grid container>
            <Button
              onClick={onBackButtonClick}
              variant="contained"
              color="primary"
              style={{ minWidth: 180, marginTop: 30, background: '#5B6C84', textTransform: 'capitalize' }}
            >
              Back
            </Button>
          </Grid>
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
