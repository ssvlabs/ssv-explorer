import styled from 'styled-components';
import Link from '@material-ui/core/Link';

const ChipLink = styled(Link)`
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  display: inline-block;
  
  & > .MuiChip-root {
    cursor: pointer;
  }
`;

export default ChipLink;
