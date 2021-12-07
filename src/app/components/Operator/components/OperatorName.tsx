import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { longStringShorten } from '~lib/utils/strings';
import OperatorType from '~app/components/Operator/components/OperatorType';
import { useStylesOperator } from '~app/components/Operator/Operator.styles';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import { OperatorProps } from '~app/components/Operator/components/OperatorProps';

export default (props: OperatorProps) => {
  const { operator, params } = props;
  const operatorClasses = useStylesOperator();

  const operatorImage = {
    backgroundImage: `url(${operator.logo})`,
  };

  return (
    <Grid style={{ marginBottom: '20px' }} container spacing={1}>
      {operator.logo && (
        <Grid item md="auto" xs={12}>
          <div className={operatorClasses.OperatorLogo} style={operatorImage} />
        </Grid>
      )}
      <Grid item>
        <Typography
          variant="h1"
          style={{ minHeight: 30 }}
        >
          {operator.name || <Skeleton />}
        </Typography>

        <span className={operatorClasses.OperatorAddress}>
          0x{longStringShorten(params.address, 4)}
          &nbsp;
          <CopyToClipboardIcon
            data={params.address}
            style={{
              marginLeft: 5,
              width: 22,
              height: 22,
              verticalAlign: 'middle',
            }} />
        </span>
      </Grid>
      <Grid item style={{ justifyContent: 'center', display: 'flex' }}>
        <OperatorType operator={operator} />
      </Grid>
    </Grid>
  );
};
