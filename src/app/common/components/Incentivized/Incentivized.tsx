import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { TableCell, Tooltip } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import { infoIconStyle } from '~root/theme';
import { useStyles } from '~app/components/Styles';
import InfoTooltip from '~app/common/components/InfoTooltip';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';

type IncentivizedProps = {
  operator?: string;
  validator?: string;
};

const Incentivized = (props: IncentivizedProps) => {
  const { operator, validator } = props;
  if (!operator && !validator) {
    return <></>;
  }

  const classes = useStyles();
  const defaultRounds: any = [];
  const [rounds, setRounds] = useState(defaultRounds);
  const headerTooltipStyle = {
    ...infoIconStyle,
    color: 'inherit',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: -3,
  };

  const isEligible = (performance: number | null): boolean => {
    if (!performance) {
      return false;
    }
    return performance >= 90;
  };

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const isCurrentRound = (round: any): boolean => {
    // TODO: implement having current epoch from API
    return false;
  };

  setTimeout(() => {
    setRounds([
      { performance: 0 },
      { performance: 10 },
      { performance: 70 },
      { performance: 90 },
      { performance: 96 },
      { performance: 0 },
      { performance: 0 },
      { performance: 0 },
    ]);
  }, 5000);

  return (
    <TableContainer className={classes.tableWithBorder}>
      <h3 style={{ paddingLeft: 15 }}>
        Incentivized Testnet
        &nbsp;
        <InfoTooltip
          style={headerTooltipStyle}
          message="Operators technical scoring metric - calculated by the percentage of attended duties within a time-frame."
        />
      </h3>

      <Table stickyHeader aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell key={'name'} align="left" width="30%">
              &nbsp;
            </TableCell>
            <TableCell key={'name'} align="left" width="35%">
              Performance
            </TableCell>
            <TableCell key={'Performance'} align="left" width="35%">
              Eligibility
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!rounds?.length ? [1, 2, 3, 4, 5, 6, 7, 8].map((round: any, roundIndex: any) => (
            <StyledRow
              hover
              role="checkbox"
              tabIndex={roundIndex + 1}
              key={`round-${roundIndex}`}
              style={{ maxHeight: 20 }}
              className={classes.condensedTableRows}
            >
              <StyledCell key="round"><Skeleton /></StyledCell>
              <StyledCell key="performance"><Skeleton /></StyledCell>
              <StyledCell key="eligible"><Skeleton /></StyledCell>
            </StyledRow>
          )) : rounds?.length && rounds.map((round: any, roundIndex: any) => {
            const rowFontWeight = isCurrentRound(round) ? 'bold' : 'inherit';
            const rowStyle: any = { fontWeight: rowFontWeight };
            return (
              <StyledRow
                hover
                role="checkbox"
                tabIndex={roundIndex + 1}
                key={`round-${roundIndex}`}
                style={{ maxHeight: 20 }}
                className={classes.condensedTableRows}
              >
                <StyledCell key="round" style={rowStyle}>
                  <Tooltip title={<div>Epoch range:<br />{`${roundIndex + 1}000-${roundIndex + 2}000`}</div>}>
                    <u>ROUND {roundIndex + 1}</u>
                  </Tooltip>
                </StyledCell>
                <StyledCell key="performance" style={rowStyle}>
                  {parseFloat(String(round.performance)).toFixed(2)}%
                </StyledCell>
                <StyledCell key="eligible" style={rowStyle}>
                  {isEligible(round.performance) ? 'Yes' : 'No'}
                </StyledCell>
              </StyledRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(Incentivized);
