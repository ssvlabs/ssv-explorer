import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SmartSearch from '~app/common/components/SmartSearch';
import { useStyles } from '~app/components/Overview/components/Hero/components/Hero.styles';

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.HeroContainer} xl={12}>
      <Grid className={classes.HeroWrapper} xs={12} md={10} lg={12}>
        <Typography className={classes.HeroHeader}>Discover the SSV Network</Typography>
      </Grid>
      <Grid className={classes.SmartSearchWrapper} xs={12} md={10} lg={12} xl={10}>
        <SmartSearch />
      </Grid>
    </Grid>
  );
};

export default observer(Hero);
