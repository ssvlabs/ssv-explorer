import React from 'react';
import CopyIcon from '~app/common/components/CopyIcon';
import CopyToClipboard from '~app/common/components/CopyToClipboard';

const CopyToClipboardIcon = ({ data, style }: { data: string, style?: any }) => {
  return (
    <CopyToClipboard>
      {({ copy }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <span onClick={() => copy(data)}>
          <CopyIcon style={style || {}} />
        </span>
      )}
    </CopyToClipboard>
  );
};

export default CopyToClipboardIcon;
