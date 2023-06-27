import React from 'react';
import { observer } from 'mobx-react';
import SmartSearch from '~app/common/components/SmartSearch';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '~app/components/Overview/components/Hero/components/Hero.styles';
import Typography from '@material-ui/core/Typography';

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.HeroContainer}>
      <Typography className={classes.HeroHeader}>Discover the SSV Network</Typography>
      <Grid className={classes.SmartSearchWrapper}>
        <SmartSearch />
      </Grid>
    </Grid>
  );
};

export default observer(Hero);
