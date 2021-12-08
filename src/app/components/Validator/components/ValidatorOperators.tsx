import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Table, TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import { infoIconStyle } from '~root/theme';
import { useStyles } from '~app/components/Styles';
import BaseStore from '~app/common/stores/BaseStore';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import PerformanceStore from '~app/common/stores/Performance.store';

const PerformanceSwitcher = styled.span<({ selected?: boolean })>`
  margin-top: 3px;
  float: right;
  padding-right: 15px;
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
    paddingTop: 10,
    paddingBottom: 10,
  };

  const performanceRowRightStyle: any = {
    ...performanceRowStyle,
    textAlign: 'right',
  };

  return (
    <TableContainer className={classes.tableWithBorder} style={{ marginBottom: 30 }}>
      <h3 style={{ paddingLeft: 15 }}>
        Operators
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
      </h3>
      <Grid container>
        <Table stickyHeader aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell key={'name'} align="left">
                Name
              </TableCell>
              <TableCell key={'name'} align="right">
                Performance
                &nbsp;
                <InfoTooltip
                  style={{ ...infoIconStyle, marginBottom: -2 }}
                  message="Operators technical scoring metric - calculated by the percentage of attended duties within a time-frame."
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!validator?.operators && (
              [1, 2, 3, 4].map((skeleton: any) => (
                <StyledRow
                  hover
                  role="checkbox"
                  tabIndex={skeleton + 1}
                  key={`operator-row-${skeleton}`}
                  style={{ maxHeight: 20 }}
                >
                  <StyledCell key="operator-info" style={performanceRowStyle} width="80%">
                    <Skeleton />
                  </StyledCell>
                  <StyledCell key="operator-performance" style={performanceRowRightStyle}>
                    <Skeleton />
                  </StyledCell>
                </StyledRow>
              ))
            )}
            {getSortedOperators(validator.operators ?? [], selectedPerformancePeriod)[1].map((operator: any, operatorIndex: number) => (
              <StyledRow
                hover
                role="checkbox"
                tabIndex={operatorIndex + 1}
                key={`operator-row-${operatorIndex}`}
                style={{ maxHeight: 20 }}
              >
                <StyledCell key="operator-info" style={performanceRowStyle}>
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
                </StyledCell>
                <StyledCell key="operator-performance" style={performanceRowRightStyle}>
                  {operator.performance[selectedPerformancePeriod] !== undefined ? `${parseFloat(String(operator.performance[selectedPerformancePeriod])).toFixed(2)}%` : <Skeleton />}
                </StyledCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </TableContainer>
  );
};

export default observer(ValidatorOperators);
