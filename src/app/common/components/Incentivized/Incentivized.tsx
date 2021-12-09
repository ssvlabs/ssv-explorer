import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
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
import { DEVELOPER_FLAGS, getLocalStorageFlagValue } from '~lib/utils/DeveloperHelper';

type IncentivizedProps = {
  operator?: string;
  validator?: string;
};

const Incentivized = (props: IncentivizedProps) => {
  if (!getLocalStorageFlagValue(DEVELOPER_FLAGS.SHOW_INCENTIVIZED_WIDGET)) {
    return <></>;
  }

  const { operator, validator } = props;
  if (!operator && !validator) {
    return <></>;
  }

  const classes = useStyles();
  const defaultRounds: any = null;
  const [rounds, setRounds] = useState(defaultRounds);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [incentivizedError, setIncentivizedError] = useState(defaultRounds);
  const placeholderRounds = [];

  for (let i = 1; i <= config.incentivized.NUMBER_OF_ROUNDS; i += 1) {
    placeholderRounds.push(i);
  }

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
      const epochs = [];
      let lastEpoch = config.incentivized.START_ROUNDS_FROM_EPOCH - 1;
      for (let i = 0; i < config.incentivized.NUMBER_OF_ROUNDS; i += 1) {
        epochs.push(`${lastEpoch}-${lastEpoch + config.incentivized.EPOCHS_PER_ROUND}`);
        lastEpoch += config.incentivized.EPOCHS_PER_ROUND;
      }
      SsvNetwork.getInstance().incentivized(
        incentivizedType,
        operator || validator,
        epochs,
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
    if (rounds === null) {
      loadIncentivized();
    }
  }, [rounds]);

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
            {!rounds?.length ? placeholderRounds.map((round: any, roundIndex: any) => (
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
                    <Tooltip title={<div>Epoch range:<br />{`${round.epoch_from + 1}-${round.epoch_to}`}</div>}>
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
      )}
    </TableContainer>
  );
};

export default observer(Incentivized);
