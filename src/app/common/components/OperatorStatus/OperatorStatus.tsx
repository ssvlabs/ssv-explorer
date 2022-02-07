import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './OperatorStatus.styles';

type Props = {
    status: string,
};

const OperatorStatus = (props: Props) => {
    const classes = useStyles();
    const isActive = props.status === 'Active';

    return (
      <Grid className={isActive ? classes.OperatorActive : classes.OperatorInactive}>{props.status}</Grid>
    );
};

export default observer(OperatorStatus);
