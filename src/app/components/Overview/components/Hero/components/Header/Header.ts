import styled from 'styled-components';

const Header = styled.h1`
  ${({ theme }) => `
    font-size: 28px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 30px;
    color: ${theme.palette.text.primary}
    font-style: normal;
    font-weight: 900;
    font-size: 28px;
    line-height: 120%;
    display: flex;
    align-items: center;
    color: #0b2a3c;
  `}
`;

export default Header;
