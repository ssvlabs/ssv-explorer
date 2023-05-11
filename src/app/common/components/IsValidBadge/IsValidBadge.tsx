import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const IsValidBadgeGrid = styled(Grid)`
  width: fit-content;
  font-size: 14px;
  height: 28px;
  border-radius: 4px;
  font-weight: 500;
  padding: 3px 5px 5px;
  color: rgb(91, 108, 132);
  background-color: rgba(161, 172, 190, 0.12);
`;

interface IsValidEntry {
  is_valid?: boolean;
}

export interface IsValidProps {
  size?: string;
  entry?: IsValidEntry;
}
const IsValidBadge = (props: IsValidProps) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    if (!props.entry) return <Skeleton style={{ width: 50 }} />;
    if (props.entry.is_valid === true) return <div />;
    return (
      <Tooltip open={showTooltip && props.size === 'big'} title={'Validator contains malformed public key, shares or encrypted shares'}>
        <IsValidBadgeGrid
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Invalid
        </IsValidBadgeGrid>
      </Tooltip>
    );
};

export default observer(IsValidBadge);
