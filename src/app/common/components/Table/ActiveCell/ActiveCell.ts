import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

const ActiveCell = styled(TableCell)`
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: lightyellow;
    user-select: none;
  }
`;

export default ActiveCell;
