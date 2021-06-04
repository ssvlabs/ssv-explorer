import styled from 'styled-components';
import { Chip } from '@material-ui/core';

const SuccessChip = styled(Chip)`
  & > .MuiChip-deleteIcon {
    color: #D9001B;
  }
`;

export default SuccessChip;
