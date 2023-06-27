import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '~app/common/components/OperatorType/OperatorType.styles';

type Props = {
    type: string,
    large?: boolean,
};

const OperatorType = (props: Props) => {
    const { type, large } = props;
    const isDappNode = type === 'dapp_node';
    const isVerified = type === 'verified_operator';
    const classes = useStyles({ large, isVerified });

    // if (large) {
    //     return (
    //       <Grid item className={classes.Type}>
    //         {isVerified ? 'Verified' : 'Dapp'}
    //         <Grid className={classes.typeImg} />
    //       </Grid>
    //     );
    // }
    // TODO: check with jon what about icons
    return (
      <Grid item className={`${classes.OperatorType} ${classes.Verified} ${classes.DappNode}`} />
    );
};

export default observer(OperatorType);
