import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStylesOperator } from '~app/components/Operator/Operator.styles';
import { OperatorProps } from '~app/components/Operator/components/OperatorProps';

const subDashboardFields = [
  {
    name: 'location',
    hint: false,
    displayName: 'Location',
  },
  {
    name: 'setup_provider',
    hint: false,
    displayName: 'Cloud Provider',
  },
  {
    name: 'eth1_node_client',
    hint: false,
    displayName: 'ETH1 node client',
  },
  {
    name: 'eth2_node_client',
    hint: false,
    displayName: 'ETH2 node client',
  },
];

export default (props: OperatorProps) => {
  const { operator } = props;
  const operatorClasses = useStylesOperator();

  if (!operator?.description) {
    return <></>;
  }

  return (
    <Grid container className={operatorClasses.SubDashboardFields} spacing={2}>
      {subDashboardFields.map((field, index) => {
        const operatorDashboardField = operator[field.name];
        return (
          operatorDashboardField ? (
            <Grid item xs={12} md={'auto'} key={index}>
              <div>
                <span className={`${operatorClasses.OperatorFieldsHeader}`}>{operator[field.name]}</span>
                <Grid container alignItems={'center'}>
                  <Grid item>
                    <span className={operatorClasses.OperatorFieldsSubHeader}>{field.displayName}</span>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ) : ''
        );
      })}
    </Grid>
  );
};
