import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import { truncateText } from '~lib/utils/strings';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Table, TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import { infoIconStyle } from '~root/theme';
import Status from '~app/common/components/Status';
import { useStyles } from '~app/components/Styles';
import InfoTooltip from '~app/common/components/InfoTooltip';
import OperatorType from '~app/common/components/OperatorType';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import { useWindowSize, WINDOW_SIZES } from '~app/hooks/useWindowSize';

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
  const classes = useStyles({});
  const windowSize = useWindowSize();
  const { validator, defaultPerformance } = props;
  const [selectedPerformancePeriod, setSelectedPerformancePeriod] = useState(defaultPerformance);
  const isMobileDevice = windowSize.size === WINDOW_SIZES.XS;
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
    if (operatorsPerformanceZero === 4) return '-';
    if (operator.performance[selectedPerformancePeriod] !== undefined) return `${parseFloat(String(operator.performance[selectedPerformancePeriod])).toFixed(1)}%`;
    return <Skeleton />;
  };

  return (
    <Grid className={classes.ValidatorOperatorsWrapper} xs={12} sm={12} md={12} lg={4} xl={3}>
      <Grid className={classes.ValidatorTableHeaderWrapper}>
        <h3 style={{ color: '#97a5ba', fontSize: 20 }}>
          Operators
        </h3>
        <Grid className={classes.performanceButtonsWrapper}>
          {supportedPeriods.map((period) => (
            <Grid onClick={() => setSelectedPerformancePeriod(period.key)}
              className={`${classes.PerformanceSwitcher} ${period.key === selectedPerformancePeriod && classes.chosenPerformance}`}>
              {period.label}
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid className={classes.backgroundColorTest} container>
        <Table stickyHeader aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.TableCellColor} key={'name'} align="left">
                Name
              </TableCell>
              {!isMobileDevice && (
              <TableCell className={classes.TableCellColor} key={'status'} align="left">
                Status
              </TableCell>
)}
              <TableCell className={classes.TableCellColor} key={'performance'} style={{ whiteSpace: 'nowrap' }}>
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
                  {!isMobileDevice && (
                  <StyledCell key="operator-status">
                    <Skeleton />
                  </StyledCell>
)}
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
                      className={classes.ValidatorOperatorLink}>
                      <Typography style={{ fontWeight: 500, fontSize: 14, marginTop: 3 }}>{truncateText(operator.name, 16)}</Typography>
                      <OperatorType type={operator.type} />
                    </Link>
                  </Typography>
                  <Typography noWrap>
                  </Typography>
                  {isMobileDevice && <Status extendClass={classes.statusPaddingTop} entry={operator} />}
                </StyledCell>
                {!isMobileDevice && (
                <StyledCell key="operator-status">
                  <Status entry={operator} />
                </StyledCell>
)}
                <StyledCell key="operator-performance" style={performanceRowRightStyle}>
                  {renderPerformance(operator)}
                </StyledCell>
              </StyledRow>
                ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default observer(ValidatorOperators);
