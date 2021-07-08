import styled from 'styled-components';
import { Chip } from '@material-ui/core';

const FailureChip = styled(Chip)`
  background-color: transparent;
  border: 1.7px solid #FF593F;
  border-radius: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
  & > .MuiChip-deleteIcon {
    color: #FF593F;
  }
`;

export default FailureChip;
