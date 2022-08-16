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
import Status from '~app/common/components/Status';
import { useStyles } from '~app/components/Styles';
// import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import OperatorType from '~app/common/components/OperatorType';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';

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
};

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
  const { validator, defaultPerformance } = props;
  const [selectedPerformancePeriod, setSelectedPerformancePeriod] = useState(defaultPerformance);
  let operatorsPerformanceZero: number = 0;
      validator?.operators?.forEach((operator: any) => {
        // eslint-disable-next-line no-plusplus
        if (operator.performance[selectedPerformancePeriod] === 0) ++operatorsPerformanceZero;
  });

  const supportedPeriods = [
    {
      label: '1D',
      key: '24h',
    },
    {
      label: '1M',
      key: '30d',
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

  const renderPerformance = (operator: any) => {
    if (operatorsPerformanceZero === 4) return 'N/A';
    if (operator.performance[selectedPerformancePeriod] !== undefined) return `${parseFloat(String(operator.performance[selectedPerformancePeriod])).toFixed(1)}%`;
    return <Skeleton />;
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
              <TableCell key={'status'} align="left">
                Status
                <InfoTooltip
                  style={{ ...infoIconStyle, marginBottom: -2 }}
                  message="Is the operator performing duties for the majority of its validators in the last 2 epochs"
                />
              </TableCell>
              <TableCell key={'performance'} style={{ whiteSpace: 'nowrap' }}>
                Performance
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
                  <StyledCell key="operator-info">
                    <Skeleton />
                  </StyledCell>
                  <StyledCell key="operator-performance">
                    <Skeleton />
                  </StyledCell>
                  <StyledCell key="operator-status">
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
                      href={`${config.routes.OPERATORS.HOME}/${operator.id}`}
                      className={classes.Link}
                      style={{ fontWeight: 500, fontSize: 14 }}
                    >
                      {operator.name}
                      <OperatorType type={operator.type} />
                    </Link>
                  </Typography>
                  <Typography noWrap>
                    <Link
                      href={`${config.routes.OPERATORS.HOME}/${operator.id}`}
                      className={classes.Link}
                      style={{ fontWeight: 500, fontSize: 14 }}
                    >
                      ID: {operator.id}
                    </Link>
                  </Typography>
                </StyledCell>
                <StyledCell key="operator-status">
                  <Status entry={operator} />
                </StyledCell>
                <StyledCell key="operator-performance" style={performanceRowRightStyle}>
                  {renderPerformance(operator)}
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
