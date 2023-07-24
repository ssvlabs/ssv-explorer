import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { infoIconStyle } from '~root/theme';
import { getPerformances } from '~lib/utils/performance';
import InfoTooltip from '~app/common/components/InfoTooltip';
import { useStyles } from '~app/components/Operator/Operator.styles';
import { OperatorProps } from '~app/components/Operator/components/OperatorProps';

const getDashboardFields = () => {
  return [];
};

export default (props: OperatorProps) => {
  const { operator, isLoading } = props;
  const operatorClasses = useStyles();

  return (
    <Grid item xs={12} lg={5}>
      <Grid container className={operatorClasses.DashboardFields}>
        {getDashboardFields().map((field: any, index) => {
          let FieldValue = '';

          if (field.name === 'performance') {
            const fieldValue = operator[field.name];
            const performances = getPerformances(fieldValue, { '30d': '30d', '24h': '24h' });
            if (performances?.length) {
              FieldValue = `${parseFloat(String(fieldValue[performances[0].key] || 0)).toFixed(2)}%`;
            }
          } else {
            FieldValue = operator[field.name];
          }

          let customColor = null;
          if (field.name === 'status') {
            customColor = FieldValue === 'Active' ? '#08c858' : 'red';
          }

          return (
            <Grid xs={field.name === 'performance' ? 4 : 3} md={'auto'} item key={index}>
              <div>
                <Typography
                  variant="h1"
                  style={{ color: customColor || '' }}
                  className={`${operatorClasses.OperatorFieldsHeader} mainHeader`}
                >
                  {isLoading ? <Skeleton /> : FieldValue}
                </Typography>
                <Grid container alignItems={'center'}>
                  <Grid item>
                    <span className={`${operatorClasses.OperatorFieldsSubHeader} mainSubHeader`}>{field.displayName}</span>
                  </Grid>
                  {field.hint && (
                    <Grid item>
                      <InfoTooltip style={{ ...infoIconStyle, verticalAlign: 'middle' }} message={field.toolTipText} />
                    </Grid>
                  )}
                </Grid>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
