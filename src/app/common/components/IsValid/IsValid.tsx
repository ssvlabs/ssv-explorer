import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { Tooltip } from '@material-ui/core';
import { IsValidProps, useStyles } from './IsValid.styles';

const IsValid = (props: IsValidProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const classes = useStyles(props);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    if (!props.entry || props.entry.is_valid === true) return <div />;
    return (
      <Tooltip open={showTooltip && props.size === 'big'} title={'Is the validator performing duties in the last 2 consecutive epochs'}>
        <Grid
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classes.isValid}>
          Invalid
        </Grid>
      </Tooltip>
    );
};

export default observer(IsValid);
