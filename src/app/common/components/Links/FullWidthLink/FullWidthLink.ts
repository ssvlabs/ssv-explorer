import styled from 'styled-components';
import { Link } from '@material-ui/core';

const FullWidthLink = styled(Link)<({ color?: any })>`
  width: 100%;
  display: block;
  color: ${({ color }) => color ?? 'initial'}
`;

export default FullWidthLink;
