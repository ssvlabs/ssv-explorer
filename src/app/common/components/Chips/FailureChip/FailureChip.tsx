import styled from 'styled-components';
import { Chip } from '@material-ui/core';

const FailureChip = styled(Chip)`
  & > .MuiChip-deleteIcon {
    color: #70B603;
  }
`;

export default FailureChip;
