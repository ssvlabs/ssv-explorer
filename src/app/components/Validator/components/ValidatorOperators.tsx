import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import { infoIconStyle } from '~root/theme';
import { useStyles } from '~app/components/Styles';
import BaseStore from '~app/common/stores/BaseStore';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import PerformanceStore from '~app/common/stores/Performance.store';

const PerformanceSwitcher = styled.span<({ selected?: boolean })>`
  margin-top: 0;
  float: right;
  margin-left: 10px;
  font-size: 15px;
  font-weight: ${({ selected }) => selected ? 900 : 600};
  user-select: none;
  cursor: pointer;
`;

type ValidatorOperatorProps = {
  validator: Record<string, any>;
  defaultPerformance: string;
  // eslint-disable-next-line no-unused-vars
  onLoadPerformances: (perf: string[], callback?: any) => void;
};

const performanceStore: PerformanceStore = BaseStore.getInstance().getStore('Performance');

function getSortedOperators(operators: any[], selectedPerformancePeriod: string): any[] {
  // @ts-ignore
  if (getSortedOperators[selectedPerformancePeriod]) {
    // @ts-ignore
    return [true, getSortedOperators[selectedPerformancePeriod]];
  }
  let havingPerformance = false;
  const sortedOperators: any[] = operators
    .map((operator: any) => {
      havingPerformance = operator.performance[selectedPerformancePeriod] !== undefined;
      return {
        ...operator,
        activeOperatorPerformance: operator.performance[selectedPerformancePeriod] || 0,
      };
    })
    .sort((o1: any, o2: any) => {
      if (o1.activeOperatorPerformance > o2.activeOperatorPerformance) {
        return -1;
      }
      if (o1.activeOperatorPerformance < o2.activeOperatorPerformance) {
        return 1;
      }
      return 0;
    });

  if (havingPerformance) {
    // @ts-ignore
    getSortedOperators[selectedPerformancePeriod] = sortedOperators;
  }
  return [havingPerformance, sortedOperators];
}

const ValidatorOperators = (props: ValidatorOperatorProps) => {
  const classes = useStyles();
  const { validator, defaultPerformance, onLoadPerformances } = props;
  const [selectedPerformancePeriod, setSelectedPerformancePeriod] = useState(defaultPerformance);

  const supportedPeriods = [
    {
      label: '1D',
      key: '24hours',
    },
    {
      label: '1M',
      key: '30days',
    },
  ];

  const performanceRowStyle: any = {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
  };

  const performanceRowRightStyle: any = {
    ...performanceRowStyle,
    textAlign: 'right',
    marginTop: 13,
  };

  return (
    <Grid item xs={12} md={3} style={{ marginTop: 1, marginBottom: 30 }}>
      <TableContainer className={classes.tableWithBorder}>
        <Grid container style={{ padding: 15 }}>
          <Grid item xs={6} md={6}>
            <h3 style={{ marginTop: 0 }}>Operators</h3>
          </Grid>

          <Grid item xs={6} md={6} style={{ marginTop: 3 }}>
            {supportedPeriods.map((period) => (
              <PerformanceSwitcher
                key={`performance-switcher-${period.key}`}
                selected={selectedPerformancePeriod === period.key}
                onClick={() => {
                  setSelectedPerformancePeriod(period.key);
                  if (getSortedOperators(validator.operators ?? [], period.key)[0]) {
                    return;
                  }
                  const requestedName = `${validator?.publicKey}_${period.key}`;
                  const shouldRequestPeriod = validator?.publicKey
                    && ['requested', 'requesting'].indexOf(performanceStore.requestedFlags[requestedName]) === -1;

                  if (shouldRequestPeriod) {
                    performanceStore.setRequestedFlag(requestedName, 'requesting');
                    onLoadPerformances([period.key], () => {
                      performanceStore.setRequestedFlag(requestedName, 'requested');
                    });
                  }
                }}
              >
                {period.label}
              </PerformanceSwitcher>
            ))}
          </Grid>

          <Grid container style={{ marginBottom: 15, color: '#A1ACBE', textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>
            <Grid item xs={6} md={6}>
              Name
            </Grid>
            <Grid item xs={6} md={6} style={{ textAlign: 'right', display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
              Performance <InfoTooltip style={infoIconStyle} message="Operators technical scoring metric - calculated by the percentage of attended duties within a time-frame." />
            </Grid>
          </Grid>
          <Grid container style={{ width: '100%' }}>
            {!validator?.operators && (
              <Grid item xs={12} md={12}>
                <Skeleton />
              </Grid>
            )}
            {getSortedOperators(validator.operators ?? [], selectedPerformancePeriod)[1].map((operator: any, operatorIndex: number) => (
              <span key={`operator-${operatorIndex}`} style={{ fontWeight: 500, fontSize: 14, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <span style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <Grid item xs={6} md={6} style={performanceRowStyle}>
                    <Typography noWrap>
                      <Link
                        href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                        className={classes.Link}
                        style={{ fontWeight: 500, fontSize: 14 }}
                      >
                        {operator.name}
                      </Link>
                    </Typography>
                    <Typography noWrap>
                      <Link
                        href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                        className={classes.Link}
                        style={{ fontWeight: 500, fontSize: 14 }}
                      >
                        {longStringShorten(operator.address)}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} style={performanceRowRightStyle}>
                    {operator.performance[selectedPerformancePeriod] !== undefined ? `${parseFloat(String(operator.performance[selectedPerformancePeriod])).toFixed(2)}%` : <Skeleton />}
                  </Grid>
                </span>
              </span>
            ))}
          </Grid>
        </Grid>
      </TableContainer>
    </Grid>
  );
};

export default observer(ValidatorOperators);
