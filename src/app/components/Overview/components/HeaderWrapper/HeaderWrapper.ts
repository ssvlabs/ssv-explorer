import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const HeaderWrapper = styled(Grid)`
  display: flex;
  padding: 6px 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.white};
`;

export default HeaderWrapper;
