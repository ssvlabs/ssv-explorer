import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './Status.styles';

type Props = {
    big?: boolean,
    status: string,
};

const Status = (props: Props) => {
    const classes = useStyles();
    const isActive = props.status === 'Active';

    return (
      <Grid className={`${props.big ? classes.Big : classes.Normal} ${isActive ? classes.Active : classes.Inactive}`}>{props.status}</Grid>
    );
};

export default observer(Status);