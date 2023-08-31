import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '~app/components/Validator/components/OperatorConsensusSlot/OperatorConsensusSlot.styles';

type OperatorConsensusSlotProps = {
    status: string;
    isNotLast: boolean;
    operatorId: string;
    isNotFirst: boolean;
    operatorName: string;
};

const LINE_AREAS = {
    left: '2 / 1 / 3 / 2',
    right: '2 / 3 / 3 / 4',
    center: '2 / 1 / 3 / 4',
};

function OperatorConsensusSlot({ status, isNotFirst, isNotLast, operatorId, operatorName }: OperatorConsensusSlotProps) {
    const lineArea = () => {
        if (isNotFirst && isNotLast) {
            return LINE_AREAS.center;
        } 
        if (!isNotFirst) {
            return LINE_AREAS.right;
        }
        return LINE_AREAS.left;
    };

    const classes = useStyles({ status, area: lineArea() });

    return (
      <Grid className={classes.OperatorConsensusSlot}>
        <Tooltip title={operatorName} placement={'top'} className={classes.tooltip}>
          <Grid className={classes.rhombuSlotWrapper}>
            <Grid className={classes.rhombus} />
            <Grid className={classes.line} />
          </Grid>
        </Tooltip>
        <Typography className={classes.ConsensusOperatorId}>ID: {operatorId}</Typography>
      </Grid>

    );
}

export default OperatorConsensusSlot;
