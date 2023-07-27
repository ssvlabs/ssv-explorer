import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useStyles } from './OperatorDetails.styles';
import OperatorType from '~app/common/components/OperatorType';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';

type Props = {
    operator: any;
    large?: boolean;
    gray80?: boolean;
};

const OperatorDetails = (props: Props) => {
    const { gray80, operator, large } = props;
    const classes = useStyles({ large, operatorLogo: operator.logo, gray80 });
    let operatorName = operator?.name;
    if (operator?.name?.length > 14) operatorName = `${operator?.name?.slice(0, 13)}...`;

    return (
      <Grid container className={classes.Wrapper}>
        <Grid item className={classes.OperatorLogo} />
        <Grid item className={classes.TextWrapper}>
          <Grid item className={classes.Name}>{operatorName}</Grid>
          <Grid item className={classes.Id}>ID: {operator.id}</Grid>
        </Grid>
        <Grid item className={classes.OperatorType}>
          <OperatorType large={large} type={operator.type} />
        </Grid>
        {large && (
        <Grid item>
          <CopyToClipboardIcon
            data={operator.public_key}
            toolTipText={'Operator key copied successfully'}
            icon={<img width={24} height={26} style={{ cursor: 'pointer' }} src="/images/copy_key.svg" alt="Copy" />}
          />
        </Grid>
          )}
      </Grid>
    );
};

export default observer(OperatorDetails);
