import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '~app/components/Operator/Operator.styles';
import OperatorType from '~app/components/Operator/components/OperatorType';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import { OperatorProps } from '~app/components/Operator/components/OperatorProps';

export default (props: OperatorProps) => {
  const { operator } = props;
  const operatorClasses = useStyles();
  const operatorId = operator?.id || props.params.address;
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
      <Grid container item xs>
        <Grid container style={{ gap: 12, alignItems: 'center' }}>
          <Grid item>
            <Typography
              variant="h1"
            >
              {operator.name || <Skeleton style={{ width: 100 }} />}
            </Typography>
          </Grid>
          {operator.public_key ? (
            <Grid item>
              <CopyToClipboardIcon
                data={operator.public_key}
                toolTipText={'Operator key copied successfully'}
                icon={<img width={24} height={26} style={{ cursor: 'pointer' }} src="/images/copy_key.svg" alt="Copy" />}
              />
            </Grid>
          ) : ''}
          <Grid item>
            <OperatorType operator={operator} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <span className={operatorClasses.OperatorAddress}>
            ID: {operatorId}
            &nbsp;
            <CopyToClipboardIcon
              data={operatorId}
              style={{
                  marginLeft: 5,
                  width: 22,
                  height: 22,
                  verticalAlign: 'middle',
              }}
            />
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};
