import React from 'react';
import styled from 'styled-components';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CopyToClipboard from '~app/common/components/CopyToClipboard';

const CopyIcon = styled(FileCopyOutlinedIcon)`
  cursor: pointer;
`;

const CopyToClipboardIcon = ({ data, style }: { data: string, style?: any }) => {
  return (
    <CopyToClipboard>
      {({ copy }) => (
        <CopyIcon onClick={() => copy(data)} style={style || {}} />
      )}
    </CopyToClipboard>
  );
};

export default CopyToClipboardIcon;
