import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

interface ChildProps {
  copy: (content: any) => void;
  style?: any;
}

interface CopyToClipboardProps {
  toolTipText?: string;
  tooltipProps?: Partial<TooltipProps>;
  children: (props: ChildProps) => React.ReactElement<any>;
  style?: any;
}

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { tooltipProps, children, style, toolTipText } = props;
  const [showingTooltip, showTooltip] = useState(false);
  const onCopy = (content: any) => {
    copy(content);
    showTooltip(true);
  };

  return (
    <Tooltip
      open={showingTooltip}
      title={toolTipText ?? 'Copied to clipboard!'}
      leaveDelay={1500}
      onClose={() => showTooltip(false)}
      {...tooltipProps || {}}
    >
      {children({ copy: onCopy, style }) as React.ReactElement<any>}
    </Tooltip>
  );
};

export default CopyToClipboard;
