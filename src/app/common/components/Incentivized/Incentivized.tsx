import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { TableCell, Tooltip } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import { infoIconStyle } from '~root/theme';
import { useStyles } from '~app/components/Styles';
import InfoTooltip from '~app/common/components/InfoTooltip';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import SsvNetwork, { IncentivizedType } from '~lib/api/SsvNetwork';

type IncentivizedProps = {
  operator?: string;
  validator?: string;
};

const Incentivized = (props: IncentivizedProps) => {
  const { operator, validator } = props;
  if (!operator && !validator) {
    return <></>;
  }

  const classes = useStyles({});
  const defaultRounds: any = null;
  const [rounds, setRounds] = useState(defaultRounds);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [incentivizedError, setIncentivizedError] = useState(defaultRounds);
  const placeholderRounds = [];

  for (let i = 1; i <= config.FEATURE.INCENTIVIZED.NUMBER_OF_ROUNDS; i += 1) {
    placeholderRounds.push(i);
  }

  const headerTooltipStyle = {
    ...infoIconStyle,
    color: 'inherit',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: -3,
  };

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const isCurrentRound = (round: any): boolean => {
    return round.epoch_from <= currentEpoch && round.epoch_to >= currentEpoch;
  };

  const loadIncentivized = () => {
    let incentivizedType: string = '';
    if (operator) {
      incentivizedType = IncentivizedType.operator;
    } else if (validator) {
      incentivizedType = IncentivizedType.validator;
    }
    if (!incentivizedType) {
      console.error('Incentivized can be loaded for validator or operator, pass the address in props!');
      setIncentivizedError('Can not load incentivized.');
    } else {
      SsvNetwork.getInstance().incentivized(
        incentivizedType,
        operator || validator,
      ).then((incentivized: any) => {
        if (incentivized?.data?.rounds) {
          setRounds(incentivized.data.rounds);
        }
        if (incentivized?.data?.current_epoch) {
          setCurrentEpoch(incentivized.data.current_epoch);
        }
      });
    }
  };

  useEffect(() => {
    if ((operator || validator) && rounds === null) {
      loadIncentivized();
    }
  }, [rounds]);

  const eligibilityStatus = (round: any, roundIndex: any, rowStyle: any) => {
    const eligiblePerformance = roundIndex === 0 ? 75 : 85;
    const eligibleEpochsMissed = roundIndex === 0 ? 788 : 473;
    const epochsMissed = Math.min(currentEpoch, round.epoch_to) - round.epoch_from - round.total_decided;
    const eligible = round.performance > eligiblePerformance;
    let textElement: any = eligible ? 'Yes' : 'No';
    if (validator && epochsMissed >= eligibleEpochsMissed && isCurrentRound(round)) {
      textElement = (
        <Grid key="eligible" container style={{ alignItems: 'center' }}>
          No
          <InfoTooltip style={{ width: 15 }}
            message={'Definitive - the validator has no chance to turn eligible during this round'} />
        </Grid>
      );
    }
    return (
      <StyledCell key="eligible" style={rowStyle}>
        {textElement}
      </StyledCell>
    );
  };

  return (
    <TableContainer className={classes.tableWithBorder}>
      <h3 style={{ paddingLeft: 15 }}>
        Incentivized Testnet
        &nbsp;
        <InfoTooltip
          style={headerTooltipStyle}
          message="Eligibility below should only be referenced  as a technical indicator. Your final eligibility status will be determined when evaluated each round, which means it could be excluded if it violates one of the testnet terms."
        />
      </h3>

      {incentivizedError ? <div>{incentivizedError}</div> : (
        <Table stickyHeader aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell key={'name'} align="left" width="40%">
                &nbsp;
              </TableCell>
              <TableCell key={'performance'} align="left" width="30%">
                Performance
              </TableCell>
              <TableCell key={'eligibility'} align="left" width="30%">
                Eligibility
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!(rounds && rounds.length >= 0) ? placeholderRounds.map((round: any, roundIndex: any) => (
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
            )) : rounds.map((round: any, roundIndex: any) => {
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
                    <Tooltip title={<div>Epoch range:<br />{`${round.epoch_from}-${round.epoch_to}`}</div>}>
                      <u>ROUND {roundIndex + 1}</u>
                    </Tooltip>
                  </StyledCell>
                  <StyledCell key="performance" style={rowStyle}>
                    {parseFloat(String(round.performance)).toFixed(2)}%
                  </StyledCell>
                  {eligibilityStatus(round, roundIndex, rowStyle)}
                </StyledRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default observer(Incentivized);
