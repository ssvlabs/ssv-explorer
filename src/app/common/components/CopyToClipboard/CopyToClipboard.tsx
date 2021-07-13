import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

interface ChildProps {
  // eslint-disable-next-line no-unused-vars
  copy: (content: any) => void;
  style?: any;
}

interface CopyToClipboardProps {
  tooltipProps?: Partial<TooltipProps>;
  // eslint-disable-next-line no-unused-vars
  children: (props: ChildProps) => React.ReactElement<any>;
  style?: any;
}

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { tooltipProps, children, style } = props;
  const [showingTooltip, showTooltip] = useState(false);
  const onCopy = (content: any) => {
    copy(content);
    showTooltip(true);
  };

  return (
    <Tooltip
      open={showingTooltip}
      title={'Copied to clipboard!'}
      leaveDelay={1500}
      onClose={() => showTooltip(false)}
      {...tooltipProps || {}}
    >
      {children({ copy: onCopy, style }) as React.ReactElement<any>}
    </Tooltip>
  );
};

export default CopyToClipboard;
