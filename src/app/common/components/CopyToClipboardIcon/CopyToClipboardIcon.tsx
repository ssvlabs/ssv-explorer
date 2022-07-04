import React from 'react';
import CopyIcon from '~app/common/components/CopyIcon';
import CopyToClipboard from '~app/common/components/CopyToClipboard';

const CopyToClipboardIcon = ({ data, icon, toolTipText, style }: { data: string, toolTipText?: string, icon?: any, style?: any }) => {
  return (
    <CopyToClipboard toolTipText={toolTipText}>
      {({ copy }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <span onClick={() => copy(data)}>
          {icon ?? <CopyIcon style={style || {}} />}
        </span>
      )}
    </CopyToClipboard>
  );
};

export default CopyToClipboardIcon;
