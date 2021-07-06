import styled from 'styled-components';

const Header = styled.h1`
  ${({ theme }) => `
    font-size: 20px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 30px;
    color: ${theme.palette.text.primary}
  `}
`;

export default Header;
