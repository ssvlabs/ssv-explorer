import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './Status.styles';

type Props = {
    big?: boolean,
    status: string,
};

const Status = (props: Props) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const classes = useStyles({ isActive: props.status === 'Active', isBig: props.big });

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    if (!props.status) return <Skeleton style={{ width: 50 }} />;
    return (
      <Tooltip open={showTooltip && props.big} title={'Is the validator performing duties in the last 4 consecutive epochs'}>
        <Grid
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classes.Status}>
          {props.status}
        </Grid>
      </Tooltip>
    );
};

export default observer(Status);
