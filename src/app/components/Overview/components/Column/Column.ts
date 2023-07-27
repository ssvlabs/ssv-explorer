import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const Column = styled(Grid)`
  align-self: start;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.white};
`;

export default Column;
