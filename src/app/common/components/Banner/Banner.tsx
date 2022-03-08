import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '~app/common/components/Banner/Banner.styles';

const Banner = (props?: any) => {
    const classes = useStyles();

    const openHowToStakeGuide = () => {
        window.open('https://bit.ly/3hOXj2G');
    };

    return (
      // <Grid style={props.style} className={classes.Wrapper} onClick={openHowToStakeGuide}>
      <Grid style={props.style} className={classes.Image} onClick={openHowToStakeGuide} />
      // </Grid>
    );
};

export default Banner;
