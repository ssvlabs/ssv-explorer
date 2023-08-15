import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { StatusProps, useStyles } from './Status.styles';

const Status = (props: StatusProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const classes = useStyles(props);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    if (!props.entry) return <Skeleton style={{ width: 50 }} />;
    return (
      <Tooltip className={props.extendClass} open={showTooltip && props.size === 'big'} title={'Is the validator performing duties in the last 2 consecutive epochs'}>
        <Grid
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classes.Status}>
          {props.entry.is_deleted ? 'Deleted' : props.entry.status}
        </Grid>
      </Tooltip>
    );
};

export default observer(Status);
