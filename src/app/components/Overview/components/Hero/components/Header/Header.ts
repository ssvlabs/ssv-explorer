import styled from 'styled-components';
import { defaultFont } from '~root/theme';

const Header = styled.h1`
  ${({ theme }) => `
    font-size: 20px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 30px;
    color: ${theme.palette.text.primary}
    font-family: ${defaultFont};
    font-style: normal;
    font-weight: 900;
    font-size: 28px;
    line-height: 120%;
    display: flex;
    align-items: center;
    color: #20EEC8;
  `}
`;

export default Header;
