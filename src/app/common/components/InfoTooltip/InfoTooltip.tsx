import React from 'react';
import { Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const InfoTooltip = ({ message }: { message: any }) => {
  return (
    <Tooltip title={message}>
      <InfoIcon style={{ marginLeft: 5 }} />
    </Tooltip>
  );
};

export default InfoTooltip;
