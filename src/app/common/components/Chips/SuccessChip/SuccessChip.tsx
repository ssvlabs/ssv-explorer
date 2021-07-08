import styled from 'styled-components';
import { Chip } from '@material-ui/core';

const SuccessChip = styled(Chip)`
  background-color: transparent;
  border: 1.7px solid #20EEC8;
  border-radius: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
  & > .MuiChip-deleteIcon {
    color: #20EEC8;
  }
`;

export default SuccessChip;
