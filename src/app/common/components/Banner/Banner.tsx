import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '~app/common/components/Banner/Banner.styles';

const Banner = () => {
    const classes = useStyles();

    const openHowToStakeGuide = () => {
        window.open('https://bit.ly/3hOXj2G');
    };

    return (
      <Grid className={classes.Wrapper} onClick={openHowToStakeGuide} />
    );
};

export default Banner;
